// Snapshot: the public memory game shown at school showcase events.
//
// Photos flash past one at a time, then the player picks the WORDS for the
// photos they saw out of a grid padded with decoys from the same topic. That
// picture-to-word step is the same one LINK learners practise.
//
// Two rules when editing items:
//   1. Every photo must have one obvious everyday name, and `word` is that
//      name. If a photo could reasonably be called something else, the player
//      is punished for a naming problem, not a memory one.
//   2. Items must look clearly different from each other, since any unseen
//      item can turn up as a decoy.
//
// Photos live in public/assets/memory-game/transport/<slug>.jpg (800x600).
// Attribution for each one is in snapshotCredits.ts.

import { SNAPSHOT_CREDITS, type SnapshotCredit } from "./snapshotCredits";

export interface SnapshotItem {
    slug: string;
    word: string;
    image: string;
    credit?: SnapshotCredit;
}

export const SNAPSHOT_TOPIC = "Public transport";

// Flash phase: how long the player has, and the most photos they can see.
// Keep SNAPSHOT_ITEMS at about twice this cap, so a player who sees every
// photo still gets roughly one decoy per real word and can't score well by
// ticking everything.
export const FLASH_DURATION_MS = 30_000;
export const MAX_FLASH_CARDS = 18;
// Ignore advance presses this soon after a photo appears, so a held key or a
// double tap can't skip a photo the player never actually saw.
export const MIN_CARD_MS = 300;

export const RECALL_DURATION_MS = 30_000;
export const MIN_DECOYS = 4;

export const POINTS_PER_HIT = 10;
export const POINTS_PER_WRONG_PICK = 5;

const photo = (slug: string) => `/assets/memory-game/transport/${slug}.jpg`;

const item = (slug: string, word: string): SnapshotItem => ({
    slug,
    word,
    image: photo(slug),
    credit: SNAPSHOT_CREDITS[slug],
});

export const SNAPSHOT_ITEMS: SnapshotItem[] = [
    item("mrt-train", "MRT train"),
    item("mrt-gantry", "MRT gantry"),
    item("ez-link-card", "EZ-Link card"),
    item("platform-screen-doors", "platform screen doors"),
    item("escalator", "escalator"),
    item("priority-seat", "priority seat"),
    item("bus-stop", "bus stop"),
    item("double-decker-bus", "double-decker bus"),
    item("taxi", "taxi"),
    item("bicycle", "bicycle"),
    item("ticket-machine", "ticket machine"),
    item("traffic-light", "traffic light"),
    item("overhead-bridge", "overhead bridge"),
    item("mrt-map", "MRT map"),
    item("zebra-crossing", "zebra crossing"),
    item("cable-car", "cable car"),
    item("mrt-station", "MRT station"),
    item("bus-interchange", "bus interchange"),
    item("lrt-train", "LRT train"),
    item("card-reader", "card reader"),
    item("taxi-stand", "taxi stand"),
    item("ferry", "ferry"),
    item("bus-lane", "bus lane"),
    item("hand-grips", "hand grips"),
    item("arrival-board", "arrival board"),
    item("monorail", "monorail"),
    item("lift", "lift"),
    item("erp-gantry", "ERP gantry"),
    item("motorcycle", "motorcycle"),
    item("lorry", "lorry"),
    item("carpark", "carpark"),
    item("petrol-station", "petrol station"),
    item("aeroplane", "aeroplane"),
    item("wheelchair", "wheelchair"),
    item("road-sign", "road sign"),
];

// The collage on the start screen.
export const SNAPSHOT_PREVIEW = [
    "double-decker-bus",
    "mrt-gantry",
    "ez-link-card",
    "taxi",
    "platform-screen-doors",
].map(photo);
