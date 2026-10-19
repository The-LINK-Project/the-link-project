import { DEFAULT_SAMPLE_RATE, GoogleError, type Spoken } from "./google";

/** Encode mono, 16-bit PCM as WAV. */
export function pcmToWav(pcm: Buffer, sampleRate = DEFAULT_SAMPLE_RATE): Buffer {
    const channels = 1;
    const bitsPerSample = 16;
    const blockAlign = (channels * bitsPerSample) / 8;
    const header = Buffer.alloc(44);
    header.write("RIFF", 0, "ascii");
    header.writeUInt32LE(36 + pcm.length, 4);
    header.write("WAVE", 8, "ascii");
    header.write("fmt ", 12, "ascii");
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * blockAlign, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write("data", 36, "ascii");
    header.writeUInt32LE(pcm.length, 40);
    return Buffer.concat([header, pcm]);
}

export function sampleRateOf(mimeType: string | undefined): number {
    const rate = Number(/rate=(\d+)/.exec(mimeType ?? "")?.[1]);
    return Number.isInteger(rate) && rate > 0 ? rate : DEFAULT_SAMPLE_RATE;
}

/** Cloud LINEAR16 responses contain a WAV header, including optional metadata chunks. */
export function wavSamples(wav: Buffer): Spoken {
    if (wav.toString("ascii", 0, 4) !== "RIFF" || wav.toString("ascii", 8, 12) !== "WAVE") {
        throw new GoogleError("Speech returned an invalid WAV file");
    }
    let rate: number | undefined;
    let pcm: Buffer | undefined;
    for (let offset = 12; offset + 8 <= wav.length;) {
        const id = wav.toString("ascii", offset, offset + 4);
        const size = wav.readUInt32LE(offset + 4);
        const start = offset + 8;
        if (id === "fmt ") {
            if (
                size < 16 ||
                start + size > wav.length ||
                wav.readUInt16LE(start) !== 1 ||
                wav.readUInt16LE(start + 2) !== 1 ||
                wav.readUInt16LE(start + 14) !== 16
            ) {
                throw new GoogleError("Speech must be mono, 16-bit PCM");
            }
            rate = wav.readUInt32LE(start + 4);
        }
        // Streaming WAV headers may declare more data than was returned.
        if (id === "data") pcm = wav.subarray(start, Math.min(start + size, wav.length));
        offset = start + size + (size % 2);
    }
    if (!rate || !pcm?.length || pcm.length % 2 !== 0) {
        throw new GoogleError("Speech returned incomplete WAV samples");
    }
    return { pcm, rate };
}

/** A single WAV header cannot describe chunks recorded at different sample rates. */
export function joinSpeech(pieces: Spoken[]): Buffer {
    const rate = pieces[0]?.rate;
    if (
        !rate ||
        pieces.some(
            (piece) => piece.rate !== rate || !piece.pcm.length || piece.pcm.length % 2 !== 0,
        )
    ) {
        throw new GoogleError("Speech returned incompatible PCM chunks");
    }
    return pcmToWav(Buffer.concat(pieces.map((piece) => piece.pcm)), rate);
}
