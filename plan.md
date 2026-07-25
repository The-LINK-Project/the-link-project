# Games Improvement Plan — Word Match & Picture Story

**Purpose:** prepare both games for a focus group with foreign domestic workers (FDWs) in Singapore, to observe how they interact with the platform and whether they can learn English from it.

**Audience:** helpers from the Philippines, Indonesia, Myanmar, Sri Lanka and India, working in Singapore households.

**Status:** ✅ approved and implemented 24 Jul 2026. Content bank: `content-bank.md`. Code: `constants/games/`, `components/games/`, `public/games/icons/`.

**Delivered with the Ministry of Manpower (MOM).** Content must stay practical and must avoid legal or employment-terms territory. See §6.2 for the explicit in-scope / out-of-scope line.

**Decisions taken** (see §12 for the full log): real SVG artwork in `/public`; **no score or result storage of any kind**; English-only UI; mixed-proficiency bank across all three difficulty tiers; **content scoped to practical daily life in Singapore**, excluding contracts, employment terms and anything legal.

---

## 1. What we're changing

| # | Change | Game |
|---|---|---|
| 1 | Categories, so rounds are grouped by real-life topic instead of one flat list | Word Match |
| 2 | Picture-led tiles as the default pairing mode | Word Match |
| 3 | Genuinely harder questions — grammar-based distractors, longer stories, new question types | Picture Story |
| 4 | A question bank of at least 10 questions per game, version-controlled in the repo | Both |
| 5 | Content rewritten to be contextually accurate for FDWs in Singapore | Both |

---

## 2. Blockers found in the current code

These are pre-existing issues that will affect the focus group directly. All three are in scope.

### 2.1 Results will not save for participants without accounts — ✅ no longer applies

`saveWordMatchResult` and `savePictureStoryResult` both call `ensureUser()`, which throws `"Not authenticated"` when there is no Clerk session (`lib/actions/user.actions.ts:84`). Both games call these fire-and-forget with only a `console.error`, so gameplay looks normal while results are silently discarded.

**Resolved by scope change:** participants all play on one signed-in account, and no results are being stored at all. The save calls are removed from both games rather than fixed. See §7.

### 2.2 The seed script cannot be re-run — ✅ no longer applies

`scripts/seed-games.ts` guards on `countDocuments() === 0` and skips entirely if any content already exists, so a new bank would never load into an already-seeded database.

**Resolved by scope change:** the bank now ships as a static file in the repo (§7.1). There is no seeding step, so this cannot bite. The script is left untouched.

### 2.3 No image infrastructure

There is no upload pipeline (no uploadthing, cloudinary or blob storage in `package.json`) and no `next.config` remote image patterns. `imageUrl` is a free-text admin field rendered as a raw `<img src>`.

*Fix:* all artwork is committed under `/public/games/` and referenced by local path. Nothing depends on venue wifi or an external CDN.

---

## 3. Word Match

### 3.1 Current behaviour

A round is `{ title, pairs[] }`; each pair has a `left` and `right` tile of `{ text, imageUrl }`. All rounds load into one continuous chain — finish one, click "Next round", get the next one in creation order. Scoring is `100 - (wrongAttempts × 10)`, with a timer that is displayed but not scored.

Existing seed content is text-to-text phrase recall ("Thank you" → "You are welcome").

### 3.2 Proposed changes

**Categories.** Add `category`, `difficulty` and `order` to the round type. Rounds without a category fall back to a "General" bucket.

The player flow becomes **category grid → round list → game**, replacing the single linear chain. Beyond being easier to navigate, this gives the focus group a signal we cannot currently capture: *which topics people choose to play first*.

**Pictures.** The tile schema and the game renderer already support `imageUrl`; what is missing is artwork and an admin picker. The substantive change is making **picture ↔ word** the default pairing mode rather than text ↔ text.

This matters for this audience specifically. Many FDWs have solid conversational English but low confidence with written vocabulary. Matching a picture of a laundry basket to the word "laundry" is a real vocabulary exercise; matching "Thank you" to "You are welcome" is phrase recall they will find trivial.

### 3.3 Proposed categories

Grounded in the actual working day and in practical life in Singapore, within the scope line at §6.2:

1. **Kitchen & cooking** — rice cooker, kettle, chopping board, frying pan, defrost, boil, steam
2. **Laundry & ironing** — washing machine, detergent, hanger, bamboo pole, iron, fold, dry rack
3. **Cleaning the flat** — mop, broom, vacuum, dustpan, rubbish chute, wipe, sweep, aircon filter
4. **Marketing & groceries** — wet market, NTUC, kilogram, fresh, frozen, receipt, change, plastic bag
5. **Hawker centre & eating out** — hawker centre, kopitiam, tray return, *kopi* / *teh*, takeaway, queue, "less sugar"
6. **Around the flat** — living room, bedroom, cupboard, curtain, window, light switch, fan, drawer, shelf
7. **At the doctor** — fever, cough, headache, stomach ache, polyclinic, appointment, pharmacy, "How are you feeling?" (routine visits only — see §6.2.1)
8. **Getting around** — MRT, bus, EZ-link card, top up, bus stop, platform, void deck, lift lobby
9. **Weather & going out** — raining, sunny, hot, umbrella, jacket, wet, dry, "It looks like rain"
10. **Time & schedule** — o'clock, morning, afternoon, evening, today, tomorrow, days of the week, "later"
11. **Everyday communication** — "Can you repeat, please?", "I don't understand", "I have finished", "This one or that one?"

**Childcare and elderly care are out of scope** — removed at your request. No content anywhere in either game involves looking after children or older people, in words or in story panels. Two replacement categories (Around the flat, Weather & going out) keep the bank at the same size.

**At the doctor** is a routine visit for the learner themselves — describing your own cough or fever to a doctor. Not caring for anyone else.

### 3.4 Bank size

Approximately **12 rounds across 6+ categories, 5–6 pairs each** — roughly 70 vocabulary items. Picture-led throughout, with a small number of phrase-to-phrase rounds retained in "Everyday communication" where pictures do not apply.

### 3.5 Difficulty calibration

For a mixed-proficiency group, each category carries rounds at more than one level, and difficulty is visible **at the point of choosing a round** rather than buried. Easy rounds are 4–5 concrete picture-to-word pairs; harder rounds increase pair count and introduce near-neighbour vocabulary within one category (mop / broom / duster, boil / steam / fry) so the distractors are genuinely confusable.

---

## 4. Picture Story

### 4.1 Current behaviour

A set is `{ title, questions[] }`; each question is `{ sequence, options, correctAnswerIndex }`. The `sequence` renders as a strip of emoji or images joined by arrows. Answer, get immediate colour feedback, click Next.

**Why it is currently too easy:** the three options differ by *meaning*, so the correct answer is recoverable from the pictures alone without reading the sentence carefully. A learner can score full marks without parsing any grammar. And a wrong answer only produces "The green one is correct" — which corrects but does not teach.

### 4.2 Difficulty levers, in order of learning value

**1. Minimal-pair distractors.** Options that differ by exactly one grammatical feature. This is the single highest-value change, because it makes reading the sentence unavoidable.

- *Tense:* "She **cooked** the rice." / "She **is cooking** the rice." / "She **will cook** the rice."
- *Preposition:* "Put the clothes **in** the machine." / "**on** the machine." / "**into** the machine."
- *Plural / agreement:* "The plates **is** on the table." / "The plates **are** on the table."
- *Question word order:* "Where **is the bus stop**?" / "Where **the bus stop is**?"

**2. Longer sequences.** 4–6 panels instead of 3, so the story has a genuine before-and-after and the tense actually matters.

**3. Four options instead of three.** Drops guess-rate from 33% to 25%.

**4. New question types.** Requires a `type` field on the question:
- `sentence` — pick the correct sentence (current behaviour)
- `order` — put the pictures in the right order
- `next` — what happens next?
- `say` — what should you say in this situation?

**5. An `explanation` field**, shown after answering. Replaces "The green one is correct" with the reason: *"We say 'has been' because she started before and is still doing it now."* For a focus group testing whether people **learn**, this is the difference between measuring recognition and delivering instruction.

**6. A `difficulty` tag per set** (easy / medium / hard), so participants can be seated at a level and we can observe where they plateau.

### 4.3 Bank size

**4 sets × 10+ questions**, tagged across the three difficulty levels.

For a mixed-proficiency group, the sets are spread evenly across easy / medium / hard rather than weighted to one level, and the difficulty tag is shown on the set picker so facilitators can seat participants appropriately and move them up mid-session. Easy questions keep 3-panel sequences and short options; hard questions use 5–6 panels, four options, and the tense and preposition minimal pairs above.

---

## 5. Artwork

**Constraint to be explicit about:** there is no image-generation tool in this environment. Artwork is hand-authored SVG.

**Word Match** — a good fit. Single objects (mop, iron, rice cooker, thermometer, EZ-link card) as clean flat line-art icons in one consistent style. A few KB each, scale cleanly, render well on a phone, work offline. Expect a **well-made icon set**, not storybook illustration.

**Picture Story** — harder, because the panels are *scenes* rather than objects. **Decision: composed SVG scenes.** Panels are built from the same shared icon vocabulary as Word Match (a simple figure, plus objects, plus directional cues), so both games speak one visual language. This is reliable and fully offline, with a lower artistic ceiling than photography.

Asset paths are structured so photographs can replace any panel later without touching game code, should real images become available after this session.

All assets live in `/public/games/` under a naming convention the admin picker can enumerate.

**Volume check:** roughly 70 Word Match icons plus scene components is the largest single block of work in this plan. If it runs long, Word Match falls back to emoji for the categories with good emoji coverage (food, transport, time) and keeps hand-drawn SVG for the domestic-work items emoji cannot express (mop, iron, rice cooker, bamboo pole, dustpan). The games work either way; only polish is at stake.

---

## 6. Contextual accuracy

This is the part that matters most, and the part I cannot fully validate alone.

### 6.1 Grounding details

HDB flat, wet market vs NTUC FairPrice, void deck, lift lobby, rubbish chute, bamboo laundry pole, aircon filter, rice cooker, EZ-link and the MRT, hawker centre and tray return, kopitiam ordering (*kopi o*, *teh peng*, "less sugar"), polyclinic and GP clinic.

Singlish that participants will genuinely **hear** (*can lah*, *later I do*, *don't have*) is worth recognising in listening-style content, while what we **teach** as the answer stays standard English.

### 6.2 Tone commitments

- **No infantilising or servile framing.** No "obedience" content, no phrasing that positions the learner as property.
- **Comprehension and clarification phrases stay in.** "Sorry, can you repeat please?", "I don't understand. Can you show me?", "I have finished. What next?". These are everyday communication, and they are the phrases that most directly help someone cope with an instruction they did not catch.
- **Names and nationalities** drawn representatively across Filipino, Indonesian, Myanmar, Sri Lankan and Indian participants, without leaning on stereotype. (The current seed uses a single name, "Ali", throughout.)

### 6.2.1 Scope line — delivered with MOM

The governing rule: **teach practical English for daily life in Singapore; say nothing that could be read as advice about employment terms or law.** Every item in the bank is checked against this table during the content review.

| In scope — practical daily life | Out of scope — legal / employment |
|---|---|
| Doctor, polyclinic, pharmacy, fever, appointment | Contracts, work permits, agency fees, transfers |
| Hawker centre, kopitiam, tray return, ordering food | Salary, deductions, payment disputes |
| MRT, bus, EZ-link, topping up, asking directions | Rest-day and off-day entitlement, working hours |
| Wet market, NTUC, prices, change, receipts | Complaints procedures, reporting an employer, MOM helpline |
| HDB flat, void deck, lift lobby, rubbish chute | Insurance, medical-cost liability, who pays for what |
| Household tasks, cooking, cleaning, laundry | Accommodation and food-provision standards |
| Time, days, weather, greetings, clarifying an instruction | Anything phrased as what someone is *entitled to* |
| Routine GP and polyclinic visits, describing symptoms | **Emergencies, accidents and home safety** — fire, gas, 995, ambulance, injury |

**Emergency and home-safety vocabulary is out of scope** — confirmed. No 995, no ambulance, no fire or gas-leak content, and no accident or injury scenarios anywhere in either game. Health content stays at the level of a routine, non-urgent clinic visit: describing a cough, a fever or a headache to a doctor.

This also constrains the **At the doctor** category: routine appointments only. Nothing depicting a fall, a collapse or any situation where someone needs urgent help. The Picture Story panels there stay visibly calm and routine for the same reason — a panel implying a medical emergency would breach this even without the words.

**Day-off vocabulary:** the *activities* remain available as ordinary life (hawker centre, park, library, post office, sending money at a remittance shop), with no framing of a rest day as an entitlement. Errands are daily life; time-off terms are employment.

**Trade-off noted:** emergency English, medical costs and insurance are all things FDWs genuinely need, and all are firmly out under this rule. That is the right call for a MOM-partnered session — it means the bank teaches *how to describe symptoms to a doctor*, never *how the bill is handled* and never *what to do when something goes wrong*.

### 6.3 Sample content for review

**Word Match — Laundry & ironing (picture ↔ word)**

| Picture | Word |
|---|---|
| washing machine | washing machine |
| detergent bottle | detergent |
| bamboo pole with clothes | hang out to dry |
| iron | iron |
| folded stack | fold |
| clothes hanger | hanger |

**Word Match — Everyday communication (phrase ↔ phrase)**

| Situation | What you say |
|---|---|
| You did not hear clearly | "Sorry, can you repeat please?" |
| You do not know the word | "I don't understand. Can you show me?" |
| You finished the work | "I have finished. What next?" |
| You are not sure which one | "This one or that one?" |
| You will be back soon | "I am on the way. I will reach in twenty minutes." |

**Picture Story — medium, tense minimal pair**

> Sequence: rice cooker (off) → rice + water → rice cooker (on) → steam rising
>
> **Question:** What is happening now?
> - She **washed** the rice.
> - ✅ She **is cooking** the rice.
> - She **will wash** the rice.
> - She **cooks** the rice every day.
>
> **Explanation:** The steam shows it is happening *right now*, so we use *is cooking*.

**Picture Story — hard, preposition minimal pair**

> Sequence: dirty clothes → washing machine → detergent → machine running → bamboo pole
>
> **Question:** What did she do first?
> - She put the clothes **on** the machine.
> - ✅ She put the clothes **in** the machine.
> - She put the clothes **under** the machine.
> - She put the clothes **at** the machine.
>
> **Explanation:** Things go *in* a washing machine because it is a container. *On* means the top of it.

**Picture Story — medium, `say` type**

> Sequence: two bottles on a shelf → hand pointing at them → question mark
>
> **Question:** You are not sure which cleaner to use. What do you say?
> - ✅ "Ma'am, this one or that one?"
> - "Ma'am, I have finished."
> - "Ma'am, the shelf is very high."
> - "Ma'am, I will buy a new one."
>
> **Explanation:** When you need someone to choose between two things, ask **"this one or that one?"** It is short and clear.

**Picture Story — medium, at the doctor (`say` type)**

> Sequence: woman holding her head → thermometer → clinic building → doctor
>
> **Question:** The doctor asks, "How are you feeling?" What do you say?
> - ✅ "I have a headache and a fever since this morning."
> - "I am going to the market later."
> - "I have a headache since tomorrow."
> - "I had a headache and a fever now."
>
> **Explanation:** Say **what is wrong** and **since when**. We use *since this morning* because it started earlier and has not stopped.

**Picture Story — easy, `order` type**

> Panels, shuffled: hang clothes on the pole · put clothes in the machine · add detergent · take clothes out
>
> **Question:** Put the pictures in the right order.
>
> **Explanation:** First the clothes go in, then the detergent, then the machine washes, then you hang them out to dry.

### 6.4 Review process

The full bank will be drafted as a separate reviewable markdown document **before any code**, so it can be red-lined in one pass by someone who works with FDWs. This review is the real schedule risk; everything downstream of approved wording is mechanical.

---

## 7. Focus group data capture

**Decision: no score or result storage at all.** Participants play on one already-signed-in account. Nothing is written to the database about how anyone performed.

Concretely:

- The `saveWordMatchResult(...)` call is removed from `components/games/WordMatchGame.tsx` and `savePictureStoryResult(...)` from `components/games/PictureStoryGame.tsx`.
- No guest session ids, no per-question logging, no result documents.
- `wordMatchResult.model.ts`, `pictureStoryResult.model.ts` and the two `save*Result` server actions are **left in place, unused**. Deleting them buys nothing and re-enabling storage later is then a one-line change per game rather than a rebuild. This is called out here so the dead code is a recorded decision rather than an oversight.
- Scores still display **on screen** during play — the timer, the match counter, the final score and the correct-answer tally all stay. Nothing about the player-facing experience changes; the results simply are not persisted.

### 7.1 Where the content lives

**Decision: a static file in the repo**, not MongoDB.

The full question bank ships as typed data under `constants/` (e.g. `constants/games/wordMatch.ts` and `constants/games/pictureStory.ts`). The two game pages import it directly instead of calling `getAllWordMatchRounds()` / `getAllPictureStorySets()`.

Why this is the right call for this session:

- **Nothing can fail at the venue.** No Atlas connection, no cold start, no network dependency. The games are static content plus client-side React.
- **No seeding step**, so §2.2 disappears entirely.
- **The bank is version-controlled and reviewable as a diff** — which suits a content set that needs a careful red-line pass more than a database does.
- `export const dynamic = "force-dynamic"` can come off both pages, so they render as fast static pages.

Trade-offs, recorded honestly:

- **Content edits need a redeploy.** There is no editing content on the day. Given the bank is being reviewed and frozen before the session anyway, this is a small loss.
- **The two admin pages stop feeding the games.** `/admin/games/word-match` and `/admin/games/picture-story` still read and write MongoDB, so anything created there will simply not appear. I will leave the pages working but add a short notice at the top stating that the focus-group games run from static content, so nobody is misled into thinking an edit took effect. Ripping the admin pages out is more churn than the situation warrants and is easy to revisit after the session.
- **Reverting is straightforward** — the static file and the DB documents hold the same shape, so switching back to `getAll*` later is a small change.

### 7.2 Consequence of storing nothing

**Stated plainly:** the session produces no quantitative data. Everything you learn comes from watching and from facilitator notes. Since the end-of-round screens still show score and time, a facilitator can jot those down if a rough record is wanted. Flagging this only because the original goal was to see whether people can learn from the games — with storage off, that judgment rests entirely on observation. That is a reasonable trade for a first session, and it is your call, already made.

This is what turns the session into evidence. Knowing that someone scored 7/10 is weak; knowing that six of eight participants chose *"on the machine"* over *"in the machine"* tells you exactly what to teach next, and is directly reportable.

---

## 8. Language

Approved: **English-only UI.** Game copy stays hardcoded English.

Rationale: it is an English-learning activity, and a mixed-nationality group has no single shared alternative language. Noted for later — the games are currently the only un-localised part of the platform; `messages/` already carries Bengali, Tamil, Filipino, Indonesian and Burmese.

---

## 9. Files affected

**Content (new)**
- `constants/games/wordMatch.ts` — the full Word Match bank, typed
- `constants/games/pictureStory.ts` — the full Picture Story bank, typed
- `types/globals.d.ts` — `category`, `difficulty`, `order` on rounds; `type`, `explanation` on questions

**Untouched, now unused for these two games** (§7, §7.1)
- `lib/database/models/wordMatchRound.model.ts`, `pictureStorySet.model.ts`
- `lib/database/models/wordMatchResult.model.ts`, `pictureStoryResult.model.ts`
- `lib/actions/wordMatch.actions.ts`, `lib/actions/pictureStory.actions.ts`
- `scripts/seed-games.ts`

Left in place deliberately. The admin pages keep using them; the games no longer do.

**Player UI**
- `components/games/WordMatchGame.tsx` — category grid, round list, picture tiles
- `components/games/PictureStoryGame.tsx` — 4 options, question types, explanation panel
- `app/[locale]/(root)/games/word-match/page.tsx`
- `app/[locale]/(root)/games/picture-story/page.tsx`

**Admin**
- `app/[locale]/admin/games/word-match/page.tsx` — add a notice that the games run from static content
- `app/[locale]/admin/games/picture-story/page.tsx` — same

**Assets**
- `public/games/` — SVG icon set

---

## 10. Order of work

1. Draft the full question bank as a reviewable document — **approval gate**
2. Types + the static content files, once the bank is approved
3. Word Match UI — categories, picture tiles, static import, save call removed
4. Picture Story UI — difficulty, explanations, question types, static import, save call removed
5. SVG icon set
6. Admin notices

Steps 2–4 are the reliable core and are now noticeably smaller than in the original plan: no schema migration, no seeding, no guest-session or logging work. If time compresses, step 5 degrades gracefully to emoji and step 6 is cosmetic.

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| Content review is the schedule bottleneck | Bank is drafted first, as a standalone markdown file, before any code (§6.4) |
| Content is frozen at deploy — no edits on the day | Accepted with the static-content decision (§7.1); bank is reviewed and frozen before the session |
| Someone edits the admin pages and expects the games to change | Notice added to both admin pages stating the games run from static content (§7.1) |
| ~70 hand-authored SVG icons is the largest work block | Falls back to emoji for categories with good coverage; hand-drawn SVG reserved for domestic-work items (§5) |
| Cultural accuracy cannot be validated by me alone | Explicit red-line pass by someone who works with FDWs, before the bank is written to code |
| A single item drifting into employment or legal territory in a MOM-partnered session | Explicit in/out table at §6.2.1, applied item-by-item during the content review; two borderline areas escalated rather than assumed |
| No quantitative data from the session | Accepted (§7) — on-screen score and time remain visible for facilitator notes |
| Composed SVG scenes may read ambiguously in Picture Story | Every panel is checked against its question during the content review; ambiguous panels get a text label |

---

## 12. Decisions log

| Question | Decision |
|---|---|
| Artwork | **Real illustrations in `/public`** — hand-authored SVG, composed scenes for Picture Story |
| Photography for story panels | **Not available** — composed SVG scenes; paths structured for later swap |
| Focus group data | **None stored** — superseded the earlier guest-saving + per-question-logging decision. Save calls removed from both games; scores shown on screen only (§7) |
| Content source | **Static file in the repo** under `constants/games/` — no MongoDB, no seeding, no venue network dependency (§7.1). Admin pages keep working against the DB but no longer feed the games, and get a notice saying so |
| Participant accounts | **All participants share one signed-in account** — no guest handling needed |
| UI language | **English-only**, game copy stays hardcoded |
| Proficiency range | **Mixed / wide** — bank spread across all three difficulty tiers, level visible at point of choosing |
| Content scope | **Practical daily life in Singapore**, excluding contracts, employment terms and legal matters (§6.2.1). Superseded an earlier, narrower "daily tasks only" reading — health, doctors, hawker centres and MRT are in scope; contracts, salary, rest-day entitlement and complaints procedures are not |
| Emergencies & home safety | **Out** — confirmed. No 995, ambulance, fire, gas, accident or injury content, in words or in story panels |
| Childcare & elderly care | **Out** — removed at your request. Replaced with Around the flat and Weather & going out |
| Delivery partner | **Ministry of Manpower** — every bank item is checked against the §6.2.1 table during the content review |

---

## 13. Approval

Awaiting your review of this document. On approval, work starts at §10 step 1 — the full question bank as a separate reviewable draft — which is itself a second approval gate before any code is written.

---

## 14. Focus Group July 2026 — the time-trial run (two sets)

A third game at `/games/focus-group`, added for the session itself. Built from
the same content bank; no new questions.

**Two sets, A and B.** There are now TWO independent runs, shown as separate
dashboard cards ("Focus Group Set A", "Focus Group Set B") at
`/games/focus-group-a` and `/games/focus-group-b`. Same game, same mechanics;
Set B is entirely different content (verified zero shared words and zero shared
questions with Set A) so a second group, or a re-run, plays fresh. Both are
defined in `constants/games/focusGroup.ts` as `FOCUS_GROUP_SETS`; the page and
`FocusGroupRun` are parameterised by the set's stage list.

Set A: kitchen / laundry / market / transport / cleaning, then kitchen-order /
laundry-next / hawker-next / MRT-order / clinic-order.
Set B: hawker / the flat / weather / fresh food / time, then boil-water-next /
cook-order / wash-order / fold-next / market-order.

**Shape.** Each set is 10 stages played straight through with no menus or
choices: 5 Word Match rounds, then 5 Picture Story questions. Start screen → stages → final
time. Designed for players who are not confident with technology, so there is
nothing to navigate.

**No grammar minimal pairs.** Questions whose four options are near-identical
sentences differing by one word (in/on/under/at, is cooking/cooked/will cook)
are excluded from the run. In a race they cost repeated 5-second freezes on a
subtle distinction. The 5 picture stages are 3 ordering and 2 what-happens-next
questions, all meaning-based. The excluded questions remain in the full Picture
Story game.

**Fixed sequence.** Both teams get the identical stage list in the identical
order (`constants/games/focusGroup.ts`). It must not be randomised — the whole
point is that the only variable is speed. The 5 Word Match rounds come from 5
different categories; the 10 questions span all 4 story sets and all 4 question
types.

**Time trial.** One clock runs from Start to the last correct answer. It never
pauses. Teams play on separate laptops and are never compared on screen — the
platform just reports one team's time, and the facilitator compares them.

**Wrong answers.** A soft red wash covers the screen and locks it for 5 seconds,
with a small card reading "Wrong" and a countdown. A correct answer gets the
same treatment in green. Both are deliberately low-contrast rather than
full-screen colour. The answer is *not* shown — it is a race. After 5 wrong
answers on the same stage the answer is revealed so nobody can get stranded:
the correct option is highlighted, or in Word Match one matching pair is shown.
That reveal is also why there is no skip button.

**Nothing is stored.** Team name, time and mistake count live on screen only.
The final screen asks the player to show it to the facilitator.

**Tunable in one place:** `FREEZE_MS` and `REVEAL_AFTER_WRONG` at the bottom of
`constants/games/focusGroup.ts`.

**Input timing.** After a correct match, taps are ignored for
`MATCH_COOLDOWN_MS` (400ms, in `constants/games/wordMatch.ts`). Selection state
is also read through refs rather than React state: a tap arriving before the
next render used to be compared against the tile that had just been matched and
scored as a wrong answer nobody had made. The same fix is applied to the
standalone Word Match game, which had the identical bug.

**Flash-card flip.** A matched Word Match pair flips over (CSS `game-flip` in
globals.css) as it settles into its completed green state — in both the
standalone game and the Focus Group run. Respects `prefers-reduced-motion`.

**Icon clarity pass.** Several icons that were too abstract were redrawn to be
literal and unmistakable, and clearly distinct from their near-neighbours: mop
(hanging strands, vs broom's fanned bristles), sweep, vacuum (upright with
hose, no longer camera-like), dust (a feather duster), and wet-market (stall
with awning and produce). Source in the icon generator; output in
public/games/icons/.

**End screen.** Removed the "show this screen to the facilitator" line.
