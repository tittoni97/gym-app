# Gym app (Alberto + girlfriend)

Installable web app (PWA) for gym training. Vanilla JS, no framework. Data in localStorage, optional sync to Supabase.

## Live and test
- `main` branch = live app (Netlify production). `test` branch = Netlify branch deploy for trying changes.
- Rule: new work goes on `test`. Merge into `main` only when Alberto says so. He has no PC and works from his phone only.
- Hosting: Netlify connected to this repo, publish directory is the repo root (no build step on Netlify; `index.html` is committed already built).

## Files
- `index.html`: the built app (generated, do not edit by hand). `build.py` assembles it from `src/`.
- `src/data.js`: exercise library (`LIB`, 47 ids), her wording overrides (`OVR.her`), plans (`PLANS.him`, `PLANS.her`), `PROFILES` (goals, accent), `SEED_HIM` (his first 7 sessions).
- `src/app.js`: all logic and screens (state, Home/Train/Progress/More, rest dock, interval timer, plate calculator, workout menu, Supabase sync, import/export). `BUILD` constant at the top shows in More: bump it on every release so the phone can confirm the version.
- `src/app.css`: Revolut-style dark theme.
- `src/index.template.html`: HTML shell with `/*CSS*/ /*DATA*/ /*APP*/` placeholders.
- `sw.js`: service worker, network first for pages. Bump the cache name `gym-v2-N` on changes.
- `demos.html`: 3D movement page (three.js + Xbot mannequin, 47 exercises, ~4.7 MB, built). Opened by the app in an iframe as `demos.html?embed=1#<exerciseId>` (embed mode shows only model + steps).
- `demos-src/`: source for `demos.html`. Run `npm install` there, then `bash assemble.sh` (paths inside point to `/home/claude/sq`; adjust). Output `exercise-demos.html` is copied to `demos.html`.
- `tools/`: headless Chrome (playwright) QA scripts used so far. They expect `/usr/bin/google-chrome` and the app served on `localhost:8765`.

## Build the app
`python3 build.py` (writes `index.html`). Test: `python3 -m http.server 8765` then run `tools/t5.py`.

## Data model (localStorage key `gym2.state`, version 2)
`{v:2, profile:'him'|'her', plates:[kg...], wk:{auto,sound,vibrate,wake}, p:{him:{sessions,body,alts,del,set,active}, her:{...}}}`
- session: `{id, day, date, t0, t1, fin, u, items:[{slot, ex, sets:[{kg,reps,done}]}], note}`; body entry: `{id,date,kg,waist,u}`.
- Sync: table `gym_state(profile text pk, payload jsonb, updated_at)`; payload = `{sessions, body, alts, del, set}`; merge by id with newest `u`, deletes kept as tombstones in `del`. Supabase URL and publishable key are pre-filled as defaults in `app.js` (publishable key, RLS policies are open for anon).
- Legacy import: old app export `{logs:{"A1|exId":[{d,s:[{w,r}]}]}}` is converted by `legacyToSessions`.

## Known weak spots
3D demos: leg press framing, dip, back extension, rower, assisted pull-up side view, blocky hands. Friend profile not included. Her 3D variant not done. Android bars/URL bar behaviour needs real phone checks.
