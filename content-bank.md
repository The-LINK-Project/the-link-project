# Content Bank — Word Match & Picture Story

**For review before any code is written.** Approved plan: `plan.md`.

**Scope reminder:** practical daily life in Singapore. Nothing about contracts, salary, rest-day entitlement, complaints or MOM procedures. No emergencies — no 995, fire, gas, accidents or injuries, in words or in pictures. No childcare or elderly care. Doctor content is a routine visit for the learner themselves.

**Totals:** 15 Word Match rounds (88 pairs) · 4 Picture Story sets (40 questions — 33 multiple-choice, 7 ordering).

**Status:** ✅ built and shipped. Content lives in `constants/games/wordMatch.ts` and `constants/games/pictureStory.ts`; artwork in `public/games/icons/`.

**Picture captions:** every Picture Story panel carries a short caption (`constants/games/iconLabels.ts`) so nobody has to guess what a drawing is. Captions are neutral nouns — never the grammar being tested, or they would give the answer away. In Word Match, picture tiles are **not** captioned while matching (that would print the answer on the card); the word appears on the tile once the pair is matched.

**How to review:** the two things most worth your eye are (a) whether the Singapore detail is right, and (b) whether the wrong answers in Picture Story are *clearly* wrong. A distractor that is arguably acceptable English will confuse people and make the data meaningless. Mark anything doubtful and I will rewrite it.

---

# Part 1 — Word Match

Format: each round is one category at one difficulty. Unless marked *phrase ↔ phrase*, the left tile is a **picture** and the right tile is the **word**.

## Kitchen & cooking

### Round 1 — "In the kitchen" · Easy · 6 pairs

| Picture | Word |
|---|---|
| rice cooker | rice cooker |
| kettle | kettle |
| frying pan | frying pan |
| chopping board | chopping board |
| knife | knife |
| spoon | spoon |

### Round 2 — "Cooking words" · Hard · 6 pairs

Near-neighbour verbs, deliberately confusable.

| Picture | Word |
|---|---|
| pot with bubbling water | boil |
| steamer with steam rising | steam |
| food in oil in a wok | fry |
| frozen meat in a bowl of water | defrost |
| hand stirring a pot with a spoon | stir |
| water being poured into a cup | pour |

## Laundry & ironing

### Round 3 — "Laundry things" · Easy · 6 pairs

| Picture | Word |
|---|---|
| washing machine | washing machine |
| detergent bottle | detergent |
| clothes hanger | hanger |
| iron | iron |
| bamboo pole with clothes | bamboo pole |
| laundry basket | laundry basket |

### Round 4 — "Laundry actions" · Medium · 5 pairs

| Picture | Word |
|---|---|
| clothes going into the machine | wash |
| clothes on the bamboo pole outside | hang out to dry |
| folded stack of clothes | fold |
| iron moving over a shirt | iron the shirt |
| clothes being put into a cupboard | put away |

## Cleaning the flat

### Round 5 — "Cleaning things" · Easy · 6 pairs

| Picture | Word |
|---|---|
| mop | mop |
| broom | broom |
| dustpan | dustpan |
| vacuum cleaner | vacuum cleaner |
| cloth | cloth |
| bucket | bucket |

### Round 6 — "Cleaning actions" · Hard · 5 pairs

Near-neighbours — the whole point is that these look similar.

| Picture | Word |
|---|---|
| broom moving dust on the floor | sweep |
| mop on a wet floor | mop |
| cloth wiping a table | wipe |
| vacuum cleaner on a rug | vacuum |
| cloth on a shelf with dust | dust |

## Marketing & groceries

### Round 7 — "At the market" · Easy · 6 pairs

| Picture | Word |
|---|---|
| wet market stall | wet market |
| shopping trolley | trolley |
| receipt | receipt |
| plastic bag | plastic bag |
| weighing scale | weighing scale |
| coins in a hand | change |

### Round 8 — "Fresh food" · Medium · 6 pairs

| Picture | Word |
|---|---|
| fish on ice | fresh fish |
| vegetables | vegetables |
| eggs in a tray | a tray of eggs |
| chicken | chicken |
| bag of rice | a bag of rice |
| bunch of bananas | a bunch of bananas |

## Hawker centre & eating out

### Round 9 — "At the hawker centre" · Easy · 6 pairs

| Picture | Word |
|---|---|
| hawker centre stalls | hawker centre |
| tray with plates | tray |
| chopsticks | chopsticks |
| cup of coffee | kopi |
| tray return rack | tray return |
| people standing in a line | queue |

## Around the flat

### Round 10 — "Rooms and things" · Easy · 6 pairs

| Picture | Word |
|---|---|
| sofa and TV | living room |
| bed | bedroom |
| cupboard | cupboard |
| window with curtains | curtain |
| ceiling fan | fan |
| light switch on a wall | light switch |

## At the doctor

### Round 11 — "Not feeling well" · Easy · 6 pairs

Routine, non-urgent. The learner describing their own symptoms.

| Picture | Word |
|---|---|
| thermometer | thermometer |
| person with a hand on their forehead | fever |
| person coughing | cough |
| person holding their head | headache |
| person holding their stomach | stomach ache |
| box of tablets | medicine |

## Getting around

### Round 12 — "Going out" · Easy · 6 pairs

| Picture | Word |
|---|---|
| MRT train | MRT |
| bus | bus |
| EZ-link card | EZ-link card |
| bus stop sign | bus stop |
| lift doors | lift |
| escalator | escalator |

## Weather & going out

### Round 13 — "The weather" · Easy · 6 pairs

| Picture | Word |
|---|---|
| rain falling | raining |
| sun | sunny |
| dark clouds | cloudy |
| umbrella | umbrella |
| jacket | jacket |
| thermometer showing high heat | hot |

## Time & schedule

### Round 14 — "What time?" · Medium · 6 pairs

| Picture | Word |
|---|---|
| clock at 7:00 | seven o'clock |
| clock at 3:30 | half past three |
| clock at 9:15 | quarter past nine |
| sun rising | morning |
| sun overhead | afternoon |
| moon and stars | night |

## Everyday communication

### Round 15 — "What do you say?" · Medium · 6 pairs · *phrase ↔ phrase*

The one round with no pictures — these have no sensible illustration.

| Situation | What you say |
|---|---|
| You did not hear clearly | "Sorry, can you repeat please?" |
| You do not know the word | "I don't understand. Can you show me?" |
| You have finished the work | "I have finished. What next?" |
| You are not sure which one | "This one or that one?" |
| You will be back soon | "I am on the way. I will reach in twenty minutes." |
| You want to ask something | "Excuse me, can I ask you something?" |

*(15 rounds, 88 word pairs total.)*

---

# Part 2 — Picture Story

Format per question: the picture sequence, the question, four options with ✅ marking the correct one, and the explanation shown after answering.

Question types: **sentence** (pick the correct sentence) · **order** (put pictures in order) · **next** (what happens next) · **say** (what do you say).

---

## Set A — "Morning in the kitchen" · Easy · 10 questions

**A1** · sentence · *present continuous*
> rice cooker (off) → rice and water → rice cooker (on) → steam rising
>
> **What is happening now?**
> - ✅ She **is cooking** the rice.
> - She **cooked** the rice.
> - She **will cook** the rice.
> - She **cook** the rice.
>
> *The steam shows it is happening right now, so we use **is cooking**.*

**A2** · sentence · *preposition*
> bowl of rice → hand → pot
>
> **Choose the correct sentence.**
> - ✅ Put the rice **in** the pot.
> - Put the rice **on** the pot.
> - Put the rice **under** the pot.
> - Put the rice **at** the pot.
>
> *Things go **in** a pot because a pot is a container. **On** means the top of it.*

**A3** · order
> Shuffled: water going into the kettle · kettle switched on · kettle steaming · hot water poured into a cup
>
> **Put the pictures in the right order.**
>
> *First fill the kettle, then switch it on, then it boils, then you pour.*

**A4** · next
> kettle steaming → cup with coffee powder in it
>
> **What happens next?**
> - ✅ She pours the hot water into the cup.
> - She puts the cup into the kettle.
> - She washes the kettle.
> - She switches off the light.
>
> *The water is hot and the cup is ready, so the next step is to pour.*

**A5** · say · *question word order*
> open cupboard → empty shelf → question mark
>
> **You cannot find the sugar. What do you say?**
> - ✅ "Ma'am, where **is the sugar**?"
> - "Ma'am, where **the sugar is**?"
> - "Ma'am, where **sugar**?"
> - "Ma'am, the sugar **where**?"
>
> *In a question, **is** comes before **the sugar**: "Where is the sugar?"*

**A6** · sentence · *past tense*
> dirty plates → hands washing a plate → clean plates on the rack
>
> **The work is finished. What do you say?**
> - ✅ I **washed** the plates.
> - I **wash** the plates.
> - I **am washing** the plates.
> - I **will wash** the plates.
>
> *The work is already finished, so we use the past: **washed**.*

**A7** · sentence · *singular / plural agreement*
> three plates on a table
>
> **Choose the correct sentence.**
> - ✅ The plates **are** on the table.
> - The plates **is** on the table.
> - The plates **am** on the table.
> - The plates **be** on the table.
>
> *"Plates" is more than one, so we use **are**.*

**A8** · sentence · *countable*
> six eggs in a tray
>
> **Choose the correct question.**
> - ✅ **How many** eggs do you want?
> - **How much** eggs do you want?
> - **How many** egg do you want?
> - **How much** egg do you want?
>
> *We can count eggs, so we say **how many**, and the word becomes **eggs**.*

**A9** · order
> Shuffled: vegetables under a tap · vegetables on a chopping board being cut · empty pan on the stove · vegetables frying in the pan
>
> **Put the pictures in the right order.**
>
> *Wash first, then cut, then heat the pan, then fry.*

**A10** · say
> rice cooker with steam → plate of rice → clock at 12:00
>
> **Lunch is ready. What do you say?**
> - ✅ "Ma'am, lunch is ready."
> - "Ma'am, lunch is ready tomorrow."
> - "Ma'am, lunch was ready."
> - "Ma'am, lunch will be ready."
>
> *The food is ready **now**, so we say "is ready".*

---

## Set B — "Laundry day" · Medium · 10 questions

**B1** · sentence · *preposition*
> dirty clothes → washing machine → detergent → machine running → bamboo pole
>
> **What did she do first?**
> - ✅ She put the clothes **in** the machine.
> - She put the clothes **on** the machine.
> - She put the clothes **under** the machine.
> - She put the clothes **at** the machine.
>
> *Clothes go **in** a washing machine because it is a container. **On** means the top of it.*

**B2** · order
> Shuffled: clothes going into the machine · detergent being poured in · machine running · clothes hanging on the pole
>
> **Put the pictures in the right order.**
>
> *Clothes in, then detergent, then the machine washes, then hang them out to dry.*

**B3** · sentence · *present continuous*
> woman at the window → clothes going onto the bamboo pole
>
> **What is she doing?**
> - ✅ She **is hanging** the clothes outside.
> - She **hung** the clothes outside.
> - She **will hang** the clothes outside.
> - She **hangs** the clothes outside.
>
> *She is doing it right now, so we use **is hanging**.*

**B4** · next
> clothes on the pole → dark clouds → first drops of rain
>
> **What happens next?**
> - ✅ She takes the clothes inside.
> - She hangs more clothes outside.
> - She opens the window.
> - She washes the clothes again.
>
> *It is starting to rain, so the dry clothes must come in.*

**B5** · sentence · *going to*
> dark clouds over HDB flats
>
> **Choose the correct sentence.**
> - ✅ It is going to **rain**.
> - It is going to **raining**.
> - It is going **rain**.
> - It is go to **rain**.
>
> *After **going to** we use the plain verb: going to **rain**.*

**B6** · sentence · *preposition*
> clothes on a bamboo pole
>
> **Choose the correct sentence.**
> - ✅ Hang the clothes **on** the pole.
> - Hang the clothes **in** the pole.
> - Hang the clothes **at** the pole.
> - Hang the clothes **into** the pole.
>
> *The clothes rest on the surface of the pole, so we say **on**. A pole is not a container, so not **in**.*

**B7** · say
> iron → light off on the iron → question mark
>
> **The iron is not working. What do you say?**
> - ✅ "Ma'am, the iron is not working."
> - "Ma'am, the iron is not work."
> - "Ma'am, the iron no working."
> - "Ma'am, the iron not working."
>
> *We need **is** and the **-ing** form: "is not working".*

**B8** · sentence · *plural agreement*
> dry clothes on the pole in the sun
>
> **Choose the correct sentence.**
> - ✅ The clothes **are** dry.
> - The clothes **is** dry.
> - The clothes **was** dry.
> - The clothes **be** dry.
>
> *"Clothes" is always plural in English, so we use **are**.*

**B9** · order
> Shuffled: iron plugged in · shirt laid flat on the board · iron moving over the shirt · shirt on a hanger
>
> **Put the pictures in the right order.**
>
> *Plug in the iron, lay the shirt flat, iron it, then hang it up.*

**B10** · next
> folded clothes in a basket → open cupboard
>
> **What happens next?**
> - ✅ She puts the clothes away in the cupboard.
> - She washes the clothes again.
> - She hangs the clothes outside.
> - She takes the clothes to the market.
>
> *The clothes are clean and folded, so the last step is putting them away.*

---

## Set C — "At the market and the hawker centre" · Medium–Hard · 10 questions

**C1** · say · *question word order*
> fish on ice → price tag → question mark
>
> **You want to know the price. What do you say?**
> - ✅ "**How much is it?**"
> - "**How much it is?**"
> - "**How much it cost?**"
> - "**It is how much?**"
>
> *In a question, **is** comes before **it**: "How much is it?"*

**C2** · sentence · *quantity*
> chicken on a scale showing 1 kg
>
> **Choose the correct sentence.**
> - ✅ I want **one kilo of** chicken.
> - I want **one kilo** chicken.
> - I want **one kilos of** chicken.
> - I want **a kilo of the** chicken.
>
> *We say **one kilo of** + the food. "Kilo" stays singular after "one".*

**C3** · order
> Shuffled: entering the wet market · choosing vegetables · paying at the stall · carrying bags home
>
> **Put the pictures in the right order.**
>
> *Go in, choose what you need, pay, then carry it home.*

**C4** · say
> kopitiam counter → cup of coffee → sugar packet with a cross through it
>
> **You want coffee with less sugar. What do you say?**
> - ✅ "One kopi, **less sugar**, please."
> - "One kopi, **less sugars**, please."
> - "One kopi, **little sugars**, please."
> - "One kopi, **few sugar**, please."
>
> *Sugar cannot be counted, so we say **less sugar** — never "sugars".*

**C5** · sentence · *past tense*
> woman leaving the market with full bags
>
> **The shopping is finished. Choose the correct sentence.**
> - ✅ I **bought** the vegetables.
> - I **buy** the vegetables.
> - I **buyed** the vegetables.
> - I **am buying** the vegetables.
>
> *The past of **buy** is **bought**. It is irregular — there is no "buyed".*

**C6** · sentence · *preposition*
> wet market stall
>
> **Choose the correct sentence.**
> - ✅ I bought the fish **at** the market.
> - I bought the fish **on** the market.
> - I bought the fish **to** the market.
> - I bought the fish **by** the market.
>
> *We use **at** for a place where something happens: at the market, at the bus stop.*

**C7** · next
> empty plates on a tray → person standing up → tray return rack
>
> **What happens next?**
> - ✅ She returns the tray to the tray return.
> - She orders more food.
> - She sits down again.
> - She washes the plates.
>
> *At a hawker centre you return your own tray when you finish.*

**C8** · sentence · *past tense*
> hand giving coins back
>
> **Choose the correct sentence.**
> - ✅ She **gave** me the change.
> - She **give** me the change.
> - She **gived** me the change.
> - She **giving** me the change.
>
> *The past of **give** is **gave**. It is irregular.*

**C9** · sentence · *countable vs uncountable*
> bag of rice next to six eggs
>
> **Choose the correct sentence.**
> - ✅ **How much** rice and **how many** eggs?
> - **How many** rice and **how much** eggs?
> - **How much** rice and **how much** eggs?
> - **How many** rice and **how many** eggs?
>
> *We cannot count rice → **how much**. We can count eggs → **how many**.*

**C10** · say
> full shopping bags → plastic bag → question mark
>
> **You need a bag. What do you say?**
> - ✅ "**Can I have** a plastic bag, please?"
> - "**Can I to have** a plastic bag, please?"
> - "**I can have** a plastic bag, please?"
> - "**Can I having** a plastic bag, please?"
>
> *A polite request is **Can I have…?** — the plain verb after "can".*

---

## Set D — "Out and about" · Hard · 10 questions

**D1** · say · *question word order*
> woman with a bag → street → bus stop sign
>
> **You are lost. What do you ask?**
> - ✅ "Excuse me, **where is the bus stop**?"
> - "Excuse me, **where the bus stop is**?"
> - "Excuse me, **where bus stop**?"
> - "Excuse me, **the bus stop is where**?"
>
> *In a question, **is** comes before **the bus stop**.*

**D2** · order
> Shuffled: walking into the MRT station · tapping the EZ-link card at the gate · waiting on the platform · getting on the train
>
> **Put the pictures in the right order.**
>
> *Enter the station, tap your card, wait on the platform, then board the train.*

**D3** · sentence · *future*
> woman on a bus → clock showing 20 minutes → HDB block
>
> **You are on the way home. Choose the correct sentence.**
> - ✅ I **will reach** in twenty minutes.
> - I **reach** in twenty minutes.
> - I **reached** in twenty minutes.
> - I **am reach** in twenty minutes.
>
> *It has not happened yet, so we use **will** + the plain verb.*

**D4** · sentence · *preposition*
> woman sitting on a bus
>
> **Choose the correct sentence.**
> - ✅ She is **on** the bus.
> - She is **in** the bus.
> - She is **at** the bus.
> - She is **into** the bus.
>
> *English uses **on** for buses, trains and planes — even though you are inside.*

**D5** · next
> dark clouds → woman at the door → umbrella by the door
>
> **What happens next?**
> - ✅ She takes the umbrella with her.
> - She leaves the umbrella at home.
> - She opens the window.
> - She hangs the clothes outside.
>
> *It looks like rain, so she takes the umbrella.*

**D6** · say · *since / for*
> woman holding her head → thermometer → clinic building → doctor
>
> **The doctor asks, "How are you feeling?" What do you say?**
> - ✅ "I have a headache and a fever **since this morning**."
> - "I have a headache and a fever **since tomorrow**."
> - "I **had** a headache and a fever **now**."
> - "I **will have** a headache and a fever **yesterday**."
>
> *Say what is wrong and **since when**. **Since this morning** means it started earlier and has not stopped.*

**D7** · sentence · *present perfect*
> calendar with three days marked → woman coughing
>
> **Choose the correct sentence.**
> - ✅ I **have had** this cough for three days.
> - I **have** this cough for three days ago.
> - I **had** this cough for three days now.
> - I **having** this cough for three days.
>
> *It started three days ago and is still happening, so we use **have had**.*

**D8** · say
> clinic reception desk → clock at 10:00
>
> **You arrive at the clinic. What do you say?**
> - ✅ "I have an appointment **at** ten o'clock."
> - "I have an appointment **on** ten o'clock."
> - "I have an appointment **in** ten o'clock."
> - "I have an appointment **to** ten o'clock."
>
> *We use **at** with a clock time: at ten o'clock, at half past three.*

**D9** · order
> Shuffled: arriving at the clinic · giving your card at the counter · waiting on a chair · talking to the doctor
>
> **Put the pictures in the right order.**
>
> *Arrive, register at the counter, wait your turn, then see the doctor.*

**D10** · sentence · *telling the time*
> clock showing 3:30
>
> **What time is it?**
> - ✅ It is **half past three**.
> - It is **half to three**.
> - It is **three past half**.
> - It is **half past of three**.
>
> *Thirty minutes after three is **half past three**.*

---

# Part 3 — Artwork needed

Roughly **75 SVG icons**, hand-drawn in one flat style, in `/public/games/`. The Picture Story panels are composed from the same set plus a simple figure, so nothing extra is drawn for them.

**Objects** — rice cooker · kettle · frying pan · wok · pot · chopping board · knife · spoon · plate · bowl · cup · chopsticks · tray · steamer · fridge · stove
**Laundry** — washing machine · detergent · hanger · iron · ironing board · bamboo pole · laundry basket · cupboard · folded clothes · shirt
**Cleaning** — mop · broom · dustpan · vacuum cleaner · cloth · bucket · rubbish chute · shelf
**Market & food** — wet market stall · trolley · receipt · plastic bag · weighing scale · coins · fish · vegetables · eggs · chicken · rice bag · bananas · hawker stall · tray return rack · queue
**Flat** — sofa · TV · bed · window · curtain · ceiling fan · light switch · drawer · door · tap
**Health** — thermometer · tablets · clinic building · reception counter · waiting chair · doctor
**Transport** — MRT train · bus · EZ-link card · bus stop sign · lift · escalator · station gate · platform
**Weather** — rain · sun · clouds · umbrella · jacket
**Time** — clock faces (7:00, 3:30, 9:15) · sunrise · sun overhead · moon
**Figure** — a simple neutral person, plus poses: holding head · coughing · hand on forehead · holding stomach · carrying bags · standing at a door

**Fallback if time runs short:** emoji for the categories with good coverage (weather, time, transport, food), hand-drawn SVG only for the items emoji cannot express (mop, iron, rice cooker, bamboo pole, dustpan, EZ-link card, tray return).

---

# Part 4 — Notes for the reviewer

Three things I would especially like checked:

1. **Singapore accuracy.** *Bamboo pole*, *tray return*, *kopi with less sugar*, *EZ-link*, *wet market*, *void deck* — flag anything that is not how people actually say it.
2. **Distractor safety.** Every wrong option should be clearly wrong. Two I am least sure about: **C6** (*at the market* — "in the market" is arguably acceptable in some contexts, so I made the alternatives *on / to / by* to keep it clean) and **D4** (*on the bus* — correct, but it is a genuinely odd rule and may frustrate rather than teach).
3. **Register.** The "say" questions use "Ma'am" where someone is speaking to an employer, matching common usage. If you would rather avoid that form entirely, it is a one-line change across six questions — say the word and I will make them neutral.

Nothing here touches contracts, pay, time off, complaints, emergencies, childcare or elderly care.
