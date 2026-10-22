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

/**
 * A second ordering of the same items in which no item keeps the index it has
 * in `first`, for two columns that must be matched across: if a pair ever sat
 * on the same row, reading straight across would give it away. Tries suffixed
 * seeds until the orders do not collide, which for a handful of items takes
 * only a few draws.
 */
export function seededDerangement<T>(first: readonly T[], seed: string): T[] {
    if (first.length < 2) return [...first];
    for (let attempt = 0; ; attempt++) {
        const candidate = seededShuffle(first, `${seed}:${attempt}`);
        if (candidate.every((item, i) => item !== first[i])) return candidate;
    }
}

/**
 * The order an exercise's options are shown in. The first time it is `first`
 * (as written, or a shuffle seeded by the exercise). Coming back after a miss
 * it is a different order, so the retry is answered by knowing the answer and
 * not by remembering where its tile was: a missed last exercise comes back
 * straight after its own feedback.
 */
export function retryOrder<T>(first: readonly T[], seed: string, again: boolean): T[] {
    if (!again || first.length < 2) return [...first];
    for (let attempt = 1; attempt <= 12; attempt++) {
        const order = seededShuffle(first, `${seed}:again:${attempt}`);
        if (order.some((item, i) => item !== first[i])) return order;
    }
    // Every shuffle tried came out as it was; turning it round still differs.
    return [...first].reverse();
}
