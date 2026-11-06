// Turns a dropped file into something the browser can draw. JPEG, PNG and
// WebP (and HEIC in Safari) decode natively. HEIC in Chrome goes through
// libheif, loaded from jsDelivr at a pinned version the first time it's needed.

const LIBHEIF_URL =
    "https://cdn.jsdelivr.net/npm/libheif-js@1.23.5/libheif-wasm/libheif-bundle.mjs";

interface HeifImage {
    get_width(): number;
    get_height(): number;
    display(target: ImageData, done: (result: ImageData | null) => void): void;
    free?(): void;
}
interface LibHeif {
    HeifDecoder: new () => { decode(data: Uint8Array): HeifImage[] };
}

let libheif: Promise<LibHeif> | null = null;

const importUrl = (url: string) => import(/* webpackIgnore: true */ url);

function loadLibheif() {
    libheif ??= importUrl(LIBHEIF_URL).then(async (mod) => {
        const lib = mod.default();
        return (
            typeof lib?.then === "function" && !lib.HeifDecoder
                ? await lib
                : lib
        ) as LibHeif;
    });
    libheif.catch(() => (libheif = null));
    return libheif;
}

export const PHOTO_NAME = /\.(heic|heif|jpe?g|png|webp)$/i;
const isHeic = (file: File) =>
    /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);

/**
 * `bitmap` is the photo, upright. `blob` is a copy the browser can decode
 * natively, kept for drawing the photo again later.
 */
export async function decodePhoto(
    file: File,
): Promise<{ blob: Blob; bitmap: ImageBitmap }> {
    try {
        return {
            blob: file,
            bitmap: await createImageBitmap(file, {
                imageOrientation: "from-image",
            }),
        };
    } catch {
        if (!isHeic(file))
            throw new Error("This file isn't a photo the tool can open");
    }
    const lib = await loadLibheif();
    const images = new lib.HeifDecoder().decode(
        new Uint8Array(await file.arrayBuffer()),
    );
    if (!images?.length) throw new Error("Couldn't read this HEIC photo");
    const image = images[0];
    const width = image.get_width();
    const height = image.get_height();
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d")!;
    const pixels = ctx.createImageData(width, height);
    await new Promise<void>((resolve, reject) =>
        image.display(pixels, (result) =>
            result
                ? resolve()
                : reject(new Error("Couldn't read this HEIC photo")),
        ),
    );
    ctx.putImageData(pixels, 0, 0);
    for (const i of images) i.free?.();
    const blob = await canvas.convertToBlob({
        type: "image/jpeg",
        quality: 0.95,
    });
    return { blob, bitmap: canvas.transferToImageBitmap() };
}
