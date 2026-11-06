"use client";

import { useEffect, useReducer, useRef } from "react";
import { flushSync } from "react-dom";
import { Download, ImagePlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_ACCENTS } from "@/components/admin/AdminPageShell";
import { aboutUsInformation } from "@/constants";
import {
    cosine,
    detectFaces,
    embedFace,
    loadModels,
} from "@/lib/faceBlur/faces";
import { decodePhoto, PHOTO_NAME } from "@/lib/faceBlur/decode";
import {
    blurShape,
    drawPhoto,
    exportPhoto,
    type Face,
} from "@/lib/faceBlur/blur";
import { makeZip } from "@/lib/faceBlur/zip";

// Blurs every face in a batch of photos, except the LINK team's, for photos
// whose organisations don't want people's faces shown. Everything happens in
// this browser tab: photos are never uploaded.

// A face this close (cosine) to a team photo is that team member. Strangers
// scored up to 0.30 on workshop photos and the team 0.39 to 0.53, so a
// side-on team member can stay blurred: a click fixes that, and a worker is
// never left unblurred by mistake.
const TEAM_MATCH = 0.4;
// Smaller faces (in photo pixels) are too soft to recognise, so they stay blurred
const MIN_RECOGNISE = 36;

type Status = "queued" | "decoding" | "detecting" | "ready" | "error";
type Edit =
    | { type: "toggle"; id: number; before: Pick<Face, "blurred" | "userSet"> }
    | { type: "add"; id: number }
    | { type: "remove"; face: Face };

interface Photo {
    id: number;
    name: string;
    file: File;
    /** A natively decodable copy (HEIC is converted once) */
    blob: Blob | null;
    width: number;
    height: number;
    faces: Face[];
    status: Status;
    error: string;
    thumb: string;
    downloaded: boolean;
    history: Edit[];
}

type Box = { x1: number; y1: number; x2: number; y2: number };

// Everything the tool tracks lives in one mutable store and a change calls
// rerender(): photos hold decoded images and run through an async queue,
// which plain React state would keep copying.
const createStore = () => ({
    photos: [] as Photo[],
    currentId: null as number | null,
    nextId: 1,
    queue: [] as Photo[],
    working: false,
    ready: null as Promise<boolean> | null,
    team: [] as { name: string; fingerprint: Float32Array }[],
    // Full-size photos are big (a 24 MP photo is ~100 MB decoded): keep 3
    bitmaps: new Map<number, ImageBitmap>(),
    status: "Loading the face models…",
    size: 1,
    keepTeam: true,
    zoom: 1,
    peek: false,
    zipping: "",
    dragging: false,
    draft: null as Box | null,
    view: { w: 0, h: 0 },
});

const summary = (p: Photo) => {
    if (p.status === "queued") return "Waiting…";
    if (p.status === "decoding") return "Opening…";
    if (p.status === "detecting") return "Finding faces…";
    if (p.status === "error") return p.error;
    if (!p.faces.length) return "No faces found";
    const blurred = p.faces.filter((f) => f.blurred).length;
    const clear = p.faces.length - blurred;
    return [blurred && `${blurred} blurred`, clear && `${clear} not blurred`]
        .filter(Boolean)
        .join(" · ");
};

// Dropped folders arrive as directory entries: walk them for photos. Entries
// must be read during the drop event itself, so this part stays synchronous.
function filesFromDrop(data: DataTransfer): Promise<File[]> {
    const entries = [...data.items]
        .filter((i) => i.kind === "file")
        .map((i) => i.webkitGetAsEntry?.() ?? null);
    if (!entries.length || entries.some((e) => !e))
        return Promise.resolve([...data.files]);
    const files: File[] = [];
    const walk = async (entry: FileSystemEntry): Promise<void> => {
        if (entry.isFile) {
            if (PHOTO_NAME.test(entry.name))
                files.push(
                    await new Promise<File>((res, rej) =>
                        (entry as FileSystemFileEntry).file(res, rej),
                    ),
                );
        } else if (entry.isDirectory) {
            const reader = (entry as FileSystemDirectoryEntry).createReader();
            for (;;) {
                const batch = await new Promise<FileSystemEntry[]>((res, rej) =>
                    reader.readEntries(res, rej),
                );
                if (!batch.length) break;
                for (const e of batch) await walk(e);
            }
        }
    };
    return Promise.all(entries.map((e) => walk(e!))).then(() => files);
}

function outNames(photos: Photo[]) {
    const used = new Set<string>();
    return photos.map((p) => {
        const base = `${p.name.replace(/\.[^.]+$/, "")}-blurred`;
        let name = `${base}.jpg`;
        for (let n = 2; used.has(name.toLowerCase()); n++)
            name = `${base}-${n}.jpg`;
        used.add(name.toLowerCase());
        return name;
    });
}

function download(blob: Blob, name: string) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
}

export default function FaceBlurTool() {
    const storeRef = useRef<ReturnType<typeof createStore> | null>(null);
    storeRef.current ??= createStore();
    const s = storeRef.current;
    const [, rerender] = useReducer((n: number) => n + 1, 0);

    const viewerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const current = () => s.photos.find((p) => p.id === s.currentId) ?? null;

    // ---------- photo memory ----------
    const remember = (id: number, bitmap: ImageBitmap) => {
        s.bitmaps.delete(id);
        s.bitmaps.set(id, bitmap);
        for (const [oldId, old] of s.bitmaps) {
            if (s.bitmaps.size <= 3) break;
            if (oldId === s.currentId || oldId === id) continue;
            s.bitmaps.delete(oldId);
            old.close();
        }
    };
    const getBitmap = async (p: Photo) => {
        const cached = s.bitmaps.get(p.id);
        if (cached) {
            remember(p.id, cached);
            return cached;
        }
        const bitmap = await createImageBitmap(p.blob!, {
            imageOrientation: "from-image",
        });
        remember(p.id, bitmap);
        return bitmap;
    };

    // ---------- team ----------
    const applyTeamRule = (p: Photo) => {
        for (const f of p.faces)
            if (f.team && !f.userSet) f.blurred = !s.keepTeam;
    };
    const matchTeam = (fingerprint: Float32Array) => {
        let best = { name: null as string | null, sim: -1 };
        for (const member of s.team) {
            const sim = cosine(fingerprint, member.fingerprint);
            if (sim > best.sim) best = { name: member.name, sim };
        }
        return best;
    };
    const loadTeam = async () => {
        // The About page's photos, so the tool follows the team as it changes
        for (const person of aboutUsInformation) {
            try {
                const blob = await (await fetch(person.image)).blob();
                const bitmap = await createImageBitmap(blob, {
                    imageOrientation: "from-image",
                });
                const faces = await detectFaces(bitmap, { thorough: false });
                const biggest = faces.sort(
                    (a, b) =>
                        (b.x2 - b.x1) * (b.y2 - b.y1) -
                        (a.x2 - a.x1) * (a.y2 - a.y1),
                )[0];
                if (biggest)
                    s.team.push({
                        name: person.name,
                        fingerprint: await embedFace(bitmap, biggest),
                    });
                bitmap.close();
            } catch (error) {
                console.warn(
                    `Couldn't read ${person.name}'s team photo`,
                    error,
                );
            }
        }
    };

    // ---------- processing ----------
    const makeThumb = async (bitmap: ImageBitmap) => {
        const w = 160;
        const canvas = new OffscreenCanvas(
            w,
            Math.round((bitmap.height / bitmap.width) * w),
        );
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        return URL.createObjectURL(
            await canvas.convertToBlob({ type: "image/jpeg", quality: 0.8 }),
        );
    };

    const processPhoto = async (p: Photo) => {
        const gone = () => !s.photos.includes(p);
        try {
            p.status = "decoding";
            rerender();
            const { blob, bitmap } = await decodePhoto(p.file);
            if (gone()) return bitmap.close();
            Object.assign(p, {
                blob,
                width: bitmap.width,
                height: bitmap.height,
                status: "detecting",
            });
            remember(p.id, bitmap);
            p.thumb = await makeThumb(bitmap);
            rerender();

            let id = 1;
            for (const found of await detectFaces(bitmap)) {
                const face: Face = {
                    ...found,
                    id: id++,
                    blurred: true,
                    team: null,
                    manual: false,
                    userSet: false,
                };
                const size = Math.min(found.x2 - found.x1, found.y2 - found.y1);
                if (
                    s.team.length &&
                    size >= MIN_RECOGNISE &&
                    found.score >= 0.5
                ) {
                    const best = matchTeam(await embedFace(bitmap, found));
                    if (best.sim >= TEAM_MATCH) face.team = best.name;
                }
                p.faces.push(face);
            }
            applyTeamRule(p);
            p.status = "ready";
        } catch (error) {
            console.error(error);
            p.status = "error";
            p.error = error instanceof Error ? error.message : String(error);
        }
        if (!gone()) rerender();
    };

    const pump = async () => {
        if (s.working) return;
        s.working = true;
        try {
            const ok = await s.ready;
            while (s.queue.length) {
                const p = s.queue.shift()!;
                if (ok) await processPhoto(p);
                else
                    Object.assign(p, {
                        status: "error",
                        error: "The face models didn't load",
                    });
            }
        } finally {
            s.working = false;
            rerender();
        }
    };

    const addFiles = (files: File[]) => {
        const photos = files
            .filter(
                (f) =>
                    !f.name.startsWith(".") &&
                    (PHOTO_NAME.test(f.name) || f.type.startsWith("image/")),
            )
            .sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { numeric: true }),
            );
        for (const file of photos) {
            const p: Photo = {
                id: s.nextId++,
                name: file.name,
                file,
                blob: null,
                width: 0,
                height: 0,
                faces: [],
                status: "queued",
                error: "",
                thumb: "",
                downloaded: false,
                history: [],
            };
            s.photos.push(p);
            s.queue.push(p);
        }
        if (!current() && s.photos.length) select(s.photos[0].id);
        rerender();
        void pump();
    };

    // ---------- viewer ----------
    const select = (id: number) => {
        s.currentId = id;
        s.zoom = 1;
        rerender();
    };
    const step = (by: number) => {
        const next =
            s.photos[s.photos.findIndex((p) => p.id === s.currentId) + by];
        if (next) select(next.id);
    };

    const paint = async () => {
        const p = current();
        const canvas = canvasRef.current;
        if (!p?.blob || !canvas) return;
        const bitmap = await getBitmap(p);
        if (s.currentId !== p.id || canvasRef.current !== canvas) return;
        if (canvas.width !== bitmap.width || canvas.height !== bitmap.height) {
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
        }
        drawPhoto(canvas.getContext("2d")!, bitmap, p.faces, s.size, !s.peek);
    };

    const zoomTo = (zoom: number, anchor?: { x: number; y: number }) => {
        const v = viewerRef.current;
        if (!v) return;
        const old = s.zoom;
        s.zoom = Math.min(8, Math.max(1, zoom));
        const ax = anchor?.x ?? v.clientWidth / 2;
        const ay = anchor?.y ?? v.clientHeight / 2;
        const fx = (v.scrollLeft + ax) / old;
        const fy = (v.scrollTop + ay) / old;
        flushSync(rerender);
        v.scrollLeft = fx * s.zoom - ax;
        v.scrollTop = fy * s.zoom - ay;
    };

    // ---------- editing ----------
    const changed = (p: Photo) => {
        p.downloaded = false;
        rerender();
    };
    const toggleFace = (p: Photo, id: number) => {
        const f = p.faces.find((x) => x.id === id);
        if (!f) return;
        if (f.manual) {
            p.faces = p.faces.filter((x) => x !== f);
            p.history.push({ type: "remove", face: f });
        } else {
            p.history.push({
                type: "toggle",
                id,
                before: { blurred: f.blurred, userSet: f.userSet },
            });
            f.blurred = !f.blurred;
            f.userSet = true;
        }
        changed(p);
    };
    const undo = () => {
        const p = current();
        const last = p?.history.pop();
        if (!p || !last) return;
        if (last.type === "toggle")
            Object.assign(p.faces.find((x) => x.id === last.id)!, last.before);
        if (last.type === "add")
            p.faces = p.faces.filter((x) => x.id !== last.id);
        if (last.type === "remove") p.faces.push(last.face);
        changed(p);
    };
    const svgPoint = (e: React.PointerEvent) => {
        const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(
            svgRef.current!.getScreenCTM()!.inverse(),
        );
        return { x: pt.x, y: pt.y };
    };

    // ---------- saving ----------
    const downloadAll = async () => {
        const ready = s.photos.filter((p) => p.status === "ready");
        if (!ready.length || s.zipping) return;
        const names = outNames(ready);
        const entries: { name: string; blob: Blob }[] = [];
        try {
            for (let i = 0; i < ready.length; i++) {
                s.zipping = `Preparing ${i + 1} of ${ready.length}…`;
                rerender();
                entries.push({
                    name: names[i],
                    blob: await exportPhoto(
                        await getBitmap(ready[i]),
                        ready[i].faces,
                        s.size,
                    ),
                });
            }
            s.zipping = "Making the ZIP…";
            rerender();
            const d = new Date();
            const pad = (n: number) => String(n).padStart(2, "0");
            const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
            download(await makeZip(entries), `blurred-photos-${stamp}.zip`);
            for (const p of ready) p.downloaded = true;
        } finally {
            s.zipping = "";
            rerender();
        }
    };

    const clearAll = () => {
        if (
            s.photos.some((p) => p.status === "ready" && !p.downloaded) &&
            !confirm("Clear these photos? Some haven't been downloaded yet.")
        )
            return;
        s.queue.length = 0;
        for (const p of s.photos) if (p.thumb) URL.revokeObjectURL(p.thumb);
        for (const bitmap of s.bitmaps.values()) bitmap.close();
        s.bitmaps.clear();
        s.photos = [];
        s.currentId = null;
        rerender();
    };

    // ---------- effects ----------
    // Models and the team's faces load once, as the page opens
    useEffect(() => {
        s.ready ??= (async () => {
            try {
                const backend = await loadModels();
                s.status = "Getting the team's faces…";
                rerender();
                await loadTeam();
                const names = s.team.map((t) => t.name).join(", ");
                s.status = `Ready · runs on your ${backend} · not blurred: ${names || "nobody"}`;
                return true;
            } catch (error) {
                console.error(error);
                s.status = `Couldn't load the face models: ${error instanceof Error ? error.message : error}`;
                return false;
            } finally {
                rerender();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Free the decoded photos when leaving the page
    useEffect(
        () => () => {
            for (const p of s.photos) if (p.thumb) URL.revokeObjectURL(p.thumb);
            for (const bitmap of s.bitmaps.values()) bitmap.close();
            s.bitmaps.clear();
        },
        [s],
    );

    // The viewer's size, for fitting the photo
    useEffect(() => {
        const v = viewerRef.current;
        if (!v) return;
        const observer = new ResizeObserver(() => {
            s.view = { w: v.clientWidth, h: v.clientHeight };
            rerender();
        });
        observer.observe(v);
        return () => observer.disconnect();
    }, [s]);

    // Pinch or ⌘-scroll zooms around the pointer (needs a non-passive listener)
    useEffect(() => {
        const v = viewerRef.current;
        if (!v) return;
        const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            const r = v.getBoundingClientRect();
            zoomTo(s.zoom * Math.exp(-e.deltaY * 0.01), {
                x: e.clientX - r.left,
                y: e.clientY - r.top,
            });
        };
        v.addEventListener("wheel", onWheel, { passive: false });
        return () => v.removeEventListener("wheel", onWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s]);

    // Keyboard shortcuts, and dropping photos anywhere on the page
    useEffect(() => {
        const typing = (t: EventTarget | null) =>
            t instanceof HTMLTextAreaElement ||
            (t instanceof HTMLInputElement && t.type !== "checkbox");
        const onKeyDown = (e: KeyboardEvent) => {
            if (typing(e.target) || !s.photos.length) return;
            if (e.code === "Space") {
                e.preventDefault();
                if (!s.peek) {
                    s.peek = true;
                    rerender();
                }
            } else if (e.key === "ArrowRight") step(1);
            else if (e.key === "ArrowLeft") step(-1);
            else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
                e.preventDefault();
                undo();
            } else if (e.metaKey || e.ctrlKey || e.altKey) return;
            else if (e.key === "+" || e.key === "=") zoomTo(s.zoom * 1.5);
            else if (e.key === "-") zoomTo(s.zoom / 1.5);
            else if (e.key === "0") zoomTo(1);
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space" && s.peek) {
                s.peek = false;
                rerender();
            }
        };
        let depth = 0;
        const hasFiles = (e: DragEvent) =>
            !!e.dataTransfer && [...e.dataTransfer.types].includes("Files");
        const onDragEnter = (e: DragEvent) => {
            if (!hasFiles(e)) return;
            depth++;
            s.dragging = true;
            rerender();
        };
        const onDragLeave = (e: DragEvent) => {
            if (!hasFiles(e)) return;
            depth = Math.max(0, depth - 1);
            if (!depth) {
                s.dragging = false;
                rerender();
            }
        };
        const onDragOver = (e: DragEvent) => {
            if (hasFiles(e)) e.preventDefault();
        };
        const onDrop = (e: DragEvent) => {
            if (!hasFiles(e)) return;
            e.preventDefault();
            depth = 0;
            s.dragging = false;
            void filesFromDrop(e.dataTransfer!).then(addFiles);
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("dragenter", onDragEnter);
        window.addEventListener("dragleave", onDragLeave);
        window.addEventListener("dragover", onDragOver);
        window.addEventListener("drop", onDrop);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("dragenter", onDragEnter);
            window.removeEventListener("dragleave", onDragLeave);
            window.removeEventListener("dragover", onDragOver);
            window.removeEventListener("drop", onDrop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s]);

    const cur = current();

    // Redraw the photo only when what it shows changes
    const paintKey = cur?.blob
        ? `${cur.id}|${cur.status}|${cur.faces.map((f) => `${f.id}${f.blurred ? 1 : 0}`).join(",")}|${s.size}|${s.peek}`
        : "";
    useEffect(() => {
        if (paintKey) void paint();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paintKey]);

    useEffect(() => {
        listRef.current
            ?.querySelector('[aria-current="true"]')
            ?.scrollIntoView({ block: "nearest" });
    }, [s.currentId]);

    // ---------- render ----------
    const total = s.photos.length;
    const done = s.photos.filter(
        (p) => p.status === "ready" || p.status === "error",
    ).length;
    const ready = s.photos.filter((p) => p.status === "ready").length;
    const failed = done - ready;
    const busy = done < total || !!s.zipping;
    const progressText = s.zipping
        ? s.zipping
        : done < total
          ? `Blurring faces · ${done} of ${total}`
          : `${ready} photo${ready === 1 ? "" : "s"} ready${failed ? ` · ${failed} couldn't open` : ""}`;

    const fit = cur?.width
        ? Math.min((s.view.w - 32) / cur.width, (s.view.h - 32) / cur.height)
        : 1;
    const shown = cur?.width
        ? {
              width: Math.max(1, Math.round(cur.width * fit * s.zoom)),
              height: Math.max(1, Math.round(cur.height * fit * s.zoom)),
          }
        : null;
    const waiting =
        cur && ["queued", "decoding", "detecting"].includes(cur.status);
    const waitingText =
        cur?.status === "queued"
            ? "Waiting…"
            : cur?.status === "decoding"
              ? "Opening the photo…"
              : "Finding faces…";

    return (
        <div className="flex h-[calc(100dvh-17rem)] min-h-[560px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-slate-200 px-4 py-3">
                <p className="min-w-48 flex-1 text-xs text-slate-500">
                    {s.status}
                </p>

                <label className="flex items-center gap-2 text-sm text-slate-500">
                    Blur size
                    <input
                        type="range"
                        min={0.8}
                        max={1.6}
                        step={0.05}
                        value={s.size}
                        onChange={(e) => {
                            s.size = Number(e.target.value);
                            for (const p of s.photos) p.downloaded = false;
                            rerender();
                        }}
                        className="w-28 accent-[rgb(70,179,199)]"
                    />
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={s.keepTeam}
                        onChange={(e) => {
                            s.keepTeam = e.target.checked;
                            for (const p of s.photos) {
                                applyTeamRule(p);
                                p.downloaded = false;
                            }
                            rerender();
                        }}
                        className="size-4 accent-[rgb(70,179,199)]"
                    />
                    Don&apos;t blur the LINK team
                </label>

                {total > 0 && (
                    <div className="flex min-w-44 flex-col gap-1.5 text-xs">
                        <span
                            className={
                                done === total && !s.zipping
                                    ? "font-semibold text-[rgb(50,150,170)]"
                                    : "text-slate-500"
                            }
                        >
                            {progressText}
                        </span>
                        <span className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <span
                                className="block h-full rounded-full bg-[rgb(90,199,219)] transition-[width] duration-300"
                                style={{ width: `${(done / total) * 100}%` }}
                            />
                        </span>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => inputRef.current?.click()}
                    >
                        <ImagePlus className="size-4" />
                        Add photos
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!total || !!s.zipping}
                        onClick={clearAll}
                    >
                        <RotateCcw className="size-4" />
                        Start over
                    </Button>
                    <Button
                        size="sm"
                        disabled={busy || !ready}
                        onClick={downloadAll}
                        className={`${ADMIN_ACCENTS.brand.button} text-white`}
                    >
                        <Download className="size-4" />
                        {ready && !busy
                            ? `Download all ${ready} (ZIP)`
                            : "Download all"}
                    </Button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*,.heic,.heif"
                        multiple
                        hidden
                        onChange={(e) => {
                            addFiles([...(e.target.files ?? [])]);
                            e.target.value = "";
                        }}
                    />
                </div>
            </div>

            <div className="flex min-h-0 flex-1">
                {/* Photo list */}
                <div
                    ref={listRef}
                    className="w-56 shrink-0 overflow-y-auto border-r border-slate-200 p-2"
                    aria-label="Photos"
                >
                    {s.photos.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            aria-current={p.id === s.currentId}
                            onClick={() => select(p.id)}
                            className={`flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-colors hover:bg-slate-100 ${
                                p.id === s.currentId
                                    ? "bg-slate-100 ring-2 ring-inset ring-[rgb(90,199,219)]"
                                    : ""
                            }`}
                        >
                            {p.thumb ? (
                                // eslint-disable-next-line @next/next/no-img-element -- a local object URL
                                <img
                                    src={p.thumb}
                                    alt=""
                                    className="h-12 w-16 shrink-0 rounded-md bg-slate-200 object-cover"
                                />
                            ) : (
                                <span className="h-12 w-16 shrink-0 rounded-md bg-slate-200" />
                            )}
                            <span className="min-w-0">
                                <span className="block truncate text-[13px] font-semibold text-slate-900">
                                    {p.name}
                                </span>
                                <span
                                    className={`block text-xs ${p.status === "error" ? "text-red-600" : "text-slate-500"}`}
                                >
                                    {summary(p)}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Viewer */}
                    <div
                        ref={viewerRef}
                        className="relative grid min-h-0 flex-1 overflow-auto bg-slate-100"
                    >
                        {!cur && (
                            <div className="m-6 place-self-center rounded-2xl border-2 border-dashed border-slate-300 px-10 py-9 text-center">
                                <p className="text-lg font-semibold text-slate-900">
                                    Drop photos or a folder here
                                </p>
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                                    Every face gets blurred automatically,
                                    except the LINK team&apos;s.
                                    <br />
                                    Check each photo, then{" "}
                                    <b className="text-slate-700">
                                        Download all
                                    </b>{" "}
                                    gives you one ZIP.
                                    <br />
                                    HEIC, JPG and PNG all work. Nothing is
                                    uploaded.
                                </p>
                            </div>
                        )}

                        {cur && !shown && (
                            <p className="place-self-center rounded-full bg-black/70 px-4 py-1.5 text-sm text-white">
                                {cur.status === "error"
                                    ? cur.error
                                    : waitingText}
                            </p>
                        )}

                        {cur && shown && (
                            <div className="relative m-auto box-content p-4">
                                <canvas
                                    ref={canvasRef}
                                    className="block"
                                    style={shown}
                                />
                                <svg
                                    ref={svgRef}
                                    viewBox={`0 0 ${cur.width} ${cur.height}`}
                                    className="absolute left-4 top-4 cursor-crosshair touch-none"
                                    style={shown}
                                    onPointerDown={(e) => {
                                        if (
                                            cur.status !== "ready" ||
                                            e.button !== 0
                                        )
                                            return;
                                        const hit = (
                                            e.target as Element
                                        ).closest("[data-face]");
                                        if (hit)
                                            return toggleFace(
                                                cur,
                                                Number(
                                                    hit.getAttribute(
                                                        "data-face",
                                                    ),
                                                ),
                                            );
                                        const { x, y } = svgPoint(e);
                                        s.draft = {
                                            x1: x,
                                            y1: y,
                                            x2: x,
                                            y2: y,
                                        };
                                        e.currentTarget.setPointerCapture(
                                            e.pointerId,
                                        );
                                        rerender();
                                    }}
                                    onPointerMove={(e) => {
                                        if (!s.draft) return;
                                        const { x, y } = svgPoint(e);
                                        s.draft.x2 = x;
                                        s.draft.y2 = y;
                                        rerender();
                                    }}
                                    onPointerUp={() => {
                                        const d = s.draft;
                                        s.draft = null;
                                        const min = 8 / (fit * s.zoom);
                                        if (
                                            d &&
                                            Math.abs(d.x2 - d.x1) >= min &&
                                            Math.abs(d.y2 - d.y1) >= min
                                        ) {
                                            const id =
                                                Math.max(
                                                    0,
                                                    ...cur.faces.map(
                                                        (f) => f.id,
                                                    ),
                                                ) + 1;
                                            cur.faces.push({
                                                id,
                                                manual: true,
                                                blurred: true,
                                                userSet: true,
                                                team: null,
                                                score: 1,
                                                angle: 0,
                                                kps: [],
                                                x1: Math.min(d.x1, d.x2),
                                                y1: Math.min(d.y1, d.y2),
                                                x2: Math.max(d.x1, d.x2),
                                                y2: Math.max(d.y1, d.y2),
                                            });
                                            cur.history.push({
                                                type: "add",
                                                id,
                                            });
                                            changed(cur);
                                        } else rerender();
                                    }}
                                >
                                    {!s.peek &&
                                        cur.faces.map((f) => {
                                            const o = blurShape(f, s.size);
                                            return (
                                                <g
                                                    key={f.id}
                                                    data-face={f.id}
                                                    className="group cursor-pointer"
                                                >
                                                    <title>
                                                        {f.manual
                                                            ? "Click to remove this blur"
                                                            : f.blurred
                                                              ? "Click to unblur"
                                                              : "Click to blur"}
                                                    </title>
                                                    <ellipse
                                                        cx={o.cx}
                                                        cy={o.cy}
                                                        rx={o.rx}
                                                        ry={o.ry}
                                                        transform={`rotate(${(o.angle * 180) / Math.PI} ${o.cx} ${o.cy})`}
                                                        fill="transparent"
                                                        strokeWidth={
                                                            f.blurred ? 3 : 2.5
                                                        }
                                                        strokeDasharray={
                                                            f.blurred
                                                                ? undefined
                                                                : "7 5"
                                                        }
                                                        className={
                                                            f.blurred
                                                                ? "stroke-transparent group-hover:stroke-[rgb(70,179,199)]"
                                                                : f.team
                                                                  ? "stroke-[#2d8cff] group-hover:[stroke-width:4]"
                                                                  : "stroke-amber-500 group-hover:[stroke-width:4]"
                                                        }
                                                        style={{
                                                            vectorEffect:
                                                                "non-scaling-stroke",
                                                        }}
                                                    />
                                                </g>
                                            );
                                        })}
                                    {s.draft && (
                                        <ellipse
                                            cx={(s.draft.x1 + s.draft.x2) / 2}
                                            cy={(s.draft.y1 + s.draft.y2) / 2}
                                            rx={
                                                Math.abs(
                                                    s.draft.x2 - s.draft.x1,
                                                ) / 2
                                            }
                                            ry={
                                                Math.abs(
                                                    s.draft.y2 - s.draft.y1,
                                                ) / 2
                                            }
                                            className="pointer-events-none fill-[rgb(90,199,219)]/25 stroke-[rgb(70,179,199)]"
                                            strokeWidth={2}
                                            style={{
                                                vectorEffect:
                                                    "non-scaling-stroke",
                                            }}
                                        />
                                    )}
                                </svg>

                                {/* Labels on every face left unblurred, so none slips through unnoticed */}
                                {!s.peek && (
                                    <div
                                        className="pointer-events-none absolute left-4 top-4"
                                        style={shown}
                                    >
                                        {cur.faces
                                            .filter((f) => !f.blurred)
                                            .map((f) => {
                                                const o = blurShape(f, s.size);
                                                return (
                                                    <span
                                                        key={f.id}
                                                        className={`absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                                            f.team
                                                                ? "bg-[#2d8cff] text-white"
                                                                : "bg-amber-500 text-amber-950"
                                                        }`}
                                                        style={{
                                                            left: `${(o.cx / cur.width) * 100}%`,
                                                            top: `${((o.cy - o.ry) / cur.height) * 100}%`,
                                                            transform:
                                                                "translate(-50%, calc(-100% - 6px))",
                                                        }}
                                                    >
                                                        {f.team
                                                            ? `${f.team} · not blurred`
                                                            : "Not blurred"}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                )}

                                {waiting && (
                                    <p className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-sm text-white">
                                        {waitingText}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Shortcuts */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-slate-200 px-4 py-2 text-xs text-slate-500">
                        <span>
                            <b className="font-semibold text-slate-800">
                                Click a face
                            </b>{" "}
                            to blur or unblur it
                        </span>
                        <span>
                            <b className="font-semibold text-slate-800">Drag</b>{" "}
                            to blur a face it missed
                        </span>
                        <span>
                            <b className="font-semibold text-slate-800">
                                Hold Space
                            </b>{" "}
                            to see the original
                        </span>
                        <span>
                            <b className="font-semibold text-slate-800">← →</b>{" "}
                            next photo
                        </span>
                        <span>
                            <b className="font-semibold text-slate-800">⌘Z</b>{" "}
                            undo
                        </span>
                        <span className="ml-auto flex gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2.5"
                                aria-label="Zoom out"
                                onClick={() => zoomTo(s.zoom / 1.5)}
                            >
                                −
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2.5"
                                onClick={() => zoomTo(1)}
                            >
                                Fit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2.5"
                                aria-label="Zoom in"
                                onClick={() => zoomTo(s.zoom * 1.5)}
                            >
                                +
                            </Button>
                        </span>
                    </div>
                </div>
            </div>

            {s.dragging && (
                <div className="pointer-events-none fixed inset-3 z-[200] grid place-items-center rounded-2xl border-4 border-dashed border-[rgb(70,179,199)] bg-[rgb(90,199,219)]/15 text-2xl font-semibold text-slate-900">
                    Drop to blur these photos
                </div>
            )}
        </div>
    );
}
