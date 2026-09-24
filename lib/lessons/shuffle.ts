/**
 * Deterministic shuffling.
 *
 * Tile order has to be stable across re-renders, or tiles would jump around
 * under the learner's finger every time state changes. Seeding by exercise id
 * gives a fixed order per exercise, and keeps rendering predictable in tests.
 */

/** Small non-cryptographic string hash (FNV-1a), used only to seed ordering. */
function hash(seed: string): number {
    let value = 0x811c9dc5;
    for (let i = 0; i < seed.length; i++) {
        value ^= seed.charCodeAt(i);
        value = Math.imul(value, 0x01000193);
    }
    return value >>> 0;
}

/** Mulberry32: tiny seeded generator, enough for shuffling a handful of tiles. */
function generator(seed: number): () => number {
    let state = seed || 1;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Fisher-Yates using a seeded generator. Does not mutate `items`. */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
    const random = generator(hash(seed));
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
