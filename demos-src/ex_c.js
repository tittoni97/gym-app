import shared from './shared.js';
export default function (C0) {
  const C = shared(C0);
  const { V, D, M, AY, LEG, HZ0, sym, stand, box, cylX, cylY, cylZ, bench, seatBack, stackTower, MT, bar, FH, barFromHands, dbs, kbHeld, cable, mid, pair, seg, place, mkMesh, THREE, bone, wp, B, mkHandle, mkDumbbell } = C;
  const out = [];
  const SY = AY + LEG - 0.012;
  const mx = a => [-a[0], a[1], a[2]];
  const feet2 = (L, o = {}) => Object.assign({ L, R: mx(L) }, o);
  const hands = (y, z, x = 0.22, ey = null) => ({ L: { w: [x, y, z], e: [x + 0.03, ey === null ? y + 0.28 : ey, z - 0.06], h: [0, -0.3, 1], n: [0, -1, 0.3] }, R: { w: [-x, y, z], e: [-x - 0.03, ey === null ? y + 0.28 : ey, z - 0.06], h: [0, -0.3, 1], n: [0, -1, 0.3] } });
  const handsN = (y, z, x = 0.20) => ({ L: { w: [x, y, z], e: [x + 0.03, y + 0.28, z - 0.06], h: [0, -1, 0.1], n: [-1, 0, 0] }, R: { w: [-x, y, z], e: [-x - 0.03, y + 0.28, z - 0.06], h: [0, -1, 0.1], n: [1, 0, 0] } });
  const G = 'Hinge, arms & core';

  // ---- deadlift ----
  {
    const mk = (H, t, hy, hz, f) => stand({ H, p: t * 0.9, t, feet: feet2([0.12, AY, 0], { }), out: 10, fr: 'w', curl: 0.95, retract: 0, arms: hands(hy, hz), nk: t * 0.45, hd: t * 0.2 });
    out.push({ id: 'deadlift', group: G, name: 'Barbell deadlift', sets: '3 × 5', bar: true, A: mk([0.56, -0.30], 52, 0.34, 0.05), B: mk([SY, HZ0], 0, 0.93, 0.0),
      phases: ['Setup', 'Pull', 'Lockout', 'Lower'], cues: ['Bar over mid-foot, shoulders just in front of the bar, back flat, brace.', 'Push the floor away, bar stays against the legs, hips and shoulders rise together.', 'Stand tall, glutes tight, do not lean back.', 'Hinge the hips back first, then bend the knees once the bar passes them.'], tempo: [1.0, 1.6, 0.8, 1.8], view: 'side',
      build: () => barFromHands });
    out.push({ id: 'rdl', group: G, name: 'Romanian deadlift', sets: '3 × 8-10', bar: true, A: mk([SY, HZ0], 0, 0.93, 0.04), B: mk([0.88, -0.30], 68, 0.58, 0.04),
      phases: ['Stand', 'Hinge', 'Stretch', 'Up'], cues: ['Stand tall, bar at the thighs, soft knees, shoulders back.', 'Push the hips back, bar slides down the thighs, back flat.', 'Bar at mid-shin, hamstrings stretched, do not round the back.', 'Drive the hips forward and squeeze the glutes at the top.'], tempo: [1.0, 2.0, 0.6, 1.4], view: 'side', build: () => barFromHands });
    const mkd = (H, t, hy, hz) => stand({ H, p: t * 0.9, t, feet: feet2([0.12, AY, 0]), out: 10, fr: 'w', curl: 0.95, retract: 0, arms: handsN(hy, hz), nk: t * 0.45, hd: t * 0.2 });
    out.push({ id: 'dbrdl', group: G, name: 'Dumbbell Romanian deadlift', sets: '3 × 8-10', A: mkd([SY, HZ0], 0, 0.88, 0.04), B: mkd([0.88, -0.30], 68, 0.52, 0.04),
      phases: ['Stand', 'Hinge', 'Stretch', 'Up'], cues: ['Stand tall, dumbbells at the front of the thighs, soft knees.', 'Push the hips back, dumbbells slide down the legs, back flat.', 'Dumbbells at mid-shin, feel the hamstrings stretch.', 'Drive the hips forward and squeeze the glutes.'], tempo: [1.0, 2.0, 0.6, 1.4], view: 'side', build: (G2, Dn) => dbs(Dn) });
    const kbA = mkd([0.58, -0.28], 48, 0.38, 0.04), kbB = mkd([SY, HZ0], 0, 0.80, 0.10);
    for (const p of [kbA, kbB]) { p.arms = { L: { w: [0.06, p === kbA ? 0.38 : 0.80, p === kbA ? 0.04 : 0.10], e: [0.10, p === kbA ? 0.62 : 1.05, 0.0], h: [0, -0.4, 1], n: [-1, 0, 0] }, R: { w: [-0.06, p === kbA ? 0.38 : 0.80, p === kbA ? 0.04 : 0.10], e: [-0.10, p === kbA ? 0.62 : 1.05, 0.0], h: [0, -0.4, 1], n: [1, 0, 0] } }; p.feet = feet2([0.22, AY, 0]); p.out = 22; }
    out.push({ id: 'kbdeadlift', group: G, name: 'Kettlebell deadlift', sets: '3 × 10', A: kbA, B: kbB,
      phases: ['Setup', 'Lift', 'Lockout', 'Lower'], cues: ['Wide stance, kettlebell between the feet, back flat, chest up.', 'Push the floor away, kettlebell close to the body.', 'Stand tall, squeeze the glutes.', 'Hips back, lower the kettlebell with a flat back.'], tempo: [1.0, 1.6, 0.8, 1.6], view: 'side', build: (G2, Dn) => kbHeld(Dn) });
  }

  // ---- kettlebell swing ----
  {
    const mk = (H, t, hy, hz, ex) => stand({ H, p: t * 0.9, t, feet: feet2([0.17, AY, 0]), out: 18, fr: 'w', curl: 0.95, retract: 0, nk: t * 0.3, hd: 0,
      arms: { L: { w: [0.06, hy, hz], e: [0.10, hy + ex[0], hz + ex[1], ], h: [0, -0.5, 1], n: [-1, 0, 0] }, R: { w: [-0.06, hy, hz], e: [-0.10, hy + ex[0], hz + ex[1]], h: [0, -0.5, 1], n: [1, 0, 0] } } });
    const A = mk([0.86, -0.30], 62, 0.55, -0.10, [0.2, 0.0]), Bs = mk([SY, HZ0 + 0.04], 2, 1.38, 0.60, [0.0, -0.1]);
    Bs.arms.L.h = [0, 0, 1]; Bs.arms.R.h = [0, 0, 1];
    const midp = { arms: { L: { w: [0.06, 0.85, 0.50] }, R: { w: [-0.06, 0.85, 0.50] } } };
    out.push({ id: 'kbswing', group: G, name: 'Kettlebell swing', sets: '3 × 15', A, B: Bs, mid: midp,
      phases: ['Hike', 'Snap', 'Float', 'Fall'], cues: ['Hips back, kettlebell swings between the thighs, back flat.', 'Snap the hips forward hard, arms just guide the bell.', 'Bell floats to chest height, you stand tall.', 'Let it fall, hinge the hips back, do not squat.'], tempo: [0.6, 0.5, 0.2, 0.7], view: 'side', build: (G2, Dn) => kbHeld(Dn, false) });
  }

  // ---- back extension ----
  {
    const mk = (t) => stand({ H: [0.95, 0.0], p: Math.max(t, 45), t, nk: t * 0.8, hd: t * 0.7, feet: feet2([0.10, 0.34, -0.62]), kp: [0, 1, 0.3], pf: { L: 45, R: 45 }, out: 0, fr: 't', curl: 0.3, retract: 0,
      arms: pair([0.08, -0.12, 0.14], [0.20, -0.22, 0.02], [-1, 0, 0.2], [0, 0, 1]) });
    out.push({ id: 'backext', group: G, name: 'Back extension', sets: '3 × 12', A: mk(130), B: mk(45),
      phases: ['Hang', 'Rise', 'Top', 'Lower'], cues: ['Pad just below the hip bones, ankles locked, arms crossed on the chest.', 'Raise the torso with a flat back until the body is a straight line.', 'Squeeze the glutes, do not hyperextend the lower back.', 'Lower slowly until you feel the hamstrings.'], tempo: [0.8, 1.4, 0.6, 1.6], view: 'side',
      build: G2 => { const pad = box(G2, 0.4, 0.1, 0.5, 0, 0.85, 0.10, MT.pad); pad.rotation.x = -0.785; box(G2, 0.08, 0.8, 0.08, 0, 0.4, 0.32, MT.frame); box(G2, 0.5, 0.04, 1.2, 0, 0.03, 0.0, MT.frame);
        const plate = box(G2, 0.4, 0.06, 0.4, 0, 0.30, -0.78, MT.frame); plate.rotation.x = 0.785; box(G2, 0.08, 0.3, 0.08, 0, 0.15, -0.78, MT.frame); } });
  }

  // ---- curls ----
  {
    const mk = (w, e, h, n) => stand({ H: [0.56, -0.36], p: 8, t: 10, nk: 5, hd: 3, feet: feet2([0.18, AY, 0.18]), out: 12, fr: 's', curl: 0.9, retract: 4,
      arms: pair(w, e, h, n) });
    const E = [0.21, -0.20, 0.19];
    const A = mk([0.25, -0.39, 0.40], E, [0.04, -0.19, 0.21], [0, 1, 0.3]), Bc = mk([0.20, 0.03, 0.22], E, [0, 0.8, 0.1], [0, 0, -1]);
    out.push({ id: 'curl', group: G, name: 'Biceps curl machine', sets: '2 × 10-12', A, B: Bc, mid: { arms: { L: { w: [0.22, -0.16, 0.46] }, R: { w: [-0.22, -0.16, 0.46] } } },
      phases: ['Set', 'Curl', 'Squeeze', 'Lower'], cues: ['Armpits on the pad top, upper arms flat on the pad, handles in both hands.', 'Curl up without lifting the elbows off the pad.', 'Squeeze the biceps at the top, no swinging.', 'Lower slowly until the arms are almost straight.'], tempo: [0.8, 1.2, 0.8, 1.8], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.36, 0.46, 0.0, 0.34, 0.1); stackTower(G2, -0.95); box(G2, 0.1, 0.8, 0.1, 0, 0.4, 0.42, MT.frame);
        const pad = box(Dn, 0.4, 0.05, 0.5, 0, 1, 0.2, MT.pad); const hdl = mkHandle('ez', 0.4); Dn.add(hdl);
        return () => { const sh = bone('LeftArm'), el = bone('LeftForeArm'); const m = mid(sh, el), dy = el.y - sh.y, dz = el.z - sh.z, L = Math.hypot(dy, dz) || 1;
          pad.rotation.x = -Math.atan2(dy, dz); pad.position.set(0, m.y + 0.07 * dz / L - 0.0, m.z - 0.07 * dy / L);
          const h = FH(); if (h.L) place(hdl, mid(h.L.handle, h.R.handle), V(1, 0, 0)); }; } });
    const mkD = (w, e, h, n) => stand({ H: [SY, HZ0], feet: feet2([0.12, AY, 0]), out: 10, curl: 0.9, arms: pair(w, e, h, n) });
    const Ed = [0.22, -0.28, -0.04];
    out.push({ id: 'dbcurl', group: G, name: 'Dumbbell curl', sets: '3 × 10-12', A: mkD([0.20, -0.54, 0.04], Ed, [0, -1, 0.05], [0, 0, 1]), B: mkD([0.20, -0.06, 0.20], Ed, [0, 0.7, 0.7], [0, 0.7, -0.7]), mid: { arms: { L: { w: [0.22, -0.27, 0.24] }, R: { w: [-0.22, -0.27, 0.24] } } },
      phases: ['Set', 'Curl', 'Squeeze', 'Lower'], cues: ['Stand tall, elbows tucked at your sides, palms forward.', 'Curl the dumbbells up, elbows stay pinned.', 'Squeeze at the top, do not swing the torso.', 'Lower slowly to straight arms.'], tempo: [0.8, 1.2, 0.8, 1.8], view: 'side', build: (G2, Dn) => dbs(Dn) });
  }

  // ---- crunch ----
  {
    const mk = (t, nk) => stand({ H: [0.56, -0.18], p: -90, t, nk, hd: nk + 6, feet: feet2([0.14, AY, 0.42]), kp: [0.1, 1, 0.3], out: 10, fr: 't', curl: 0.4, retract: 0,
      arms: pair([0.10, 0.16, -0.02], [0.22, 0.10, 0.10], [0, 1, 0], [-1, 0, 0]) });
    out.push({ id: 'crunch', group: G, name: 'Abs bench crunch', sets: '3 × 12-15', A: mk(-90, -90), B: mk(-48, -42),
      phases: ['Set', 'Crunch', 'Squeeze', 'Lower'], cues: ['Lie back, knees bent, hands beside the head, lower back pressed on the pad.', 'Curl the ribs toward the hips, chin off the chest.', 'Hold one second, breathe out, abs tight.', 'Lower slowly, do not drop onto the pad.'], tempo: [0.8, 1.2, 0.8, 1.6], view: 'side',
      build: G2 => { bench(G2, -0.72, 0.42, 0.47, 0.34); } });
  }

  // ---- hanging knee raise ----
  {
    const arms = { L: { w: [0.20, 2.07, 0.0], e: [0.22, 1.78, -0.06], h: [0, 1, 0], n: [0, 0, 1] }, R: { w: [-0.20, 2.07, 0.0], e: [-0.22, 1.78, -0.06], h: [0, 1, 0], n: [0, 0, 1] } };
    const mk = (a) => stand({ H: [1.08, -0.02], p: -4, t: -4, nk: -2, hd: -2, feet: feet2(a), kp: [0, 0, 1], pf: { L: 30, R: 30 }, out: 4, fr: 'w', curl: 0.95, retract: 0, arms });
    out.push({ id: 'kneeraise', group: G, name: 'Hanging knee raise', sets: '3 × 8-12', A: mk([0.10, 0.22, 0.0]), B: mk([0.10, 0.60, 0.42]),
      phases: ['Hang', 'Raise', 'Squeeze', 'Lower'], cues: ['Hang from the bar, shoulders pulled down, legs together.', 'Bring the knees up to hip height, curling the pelvis up.', 'Squeeze the abs, no swinging.', 'Lower slowly, keep the body still.'], tempo: [0.8, 1.2, 0.6, 1.6], view: 'three',
      build: G2 => { cylX(G2, 0.016, 1.0, 0, 2.05, 0, MT.frame); box(G2, 0.06, 2.0, 0.06, 0.55, 1.0, 0.0, MT.frame); box(G2, 0.06, 2.0, 0.06, -0.55, 1.0, 0.0, MT.frame); } });
  }

  // ---- plank ----
  {
    const Lb = 1.35, ay = AY + 0.03;
    const mk = (sy) => { const sz = 0.45, az = sz - Math.sqrt(Lb * Lb - (sy - ay) * (sy - ay)); const k = 0.466 / Lb;
      const H = [sy + (ay - sy) * k, sz + (az - sz) * k]; const t = Math.atan2(sz - H[1], sy - H[0]) * 180 / Math.PI;
      return stand({ H, p: t, t, feet: feet2([0.10, ay, az]), pf: { L: 58, R: 58 }, out: 4, fr: 'w', curl: 0, retract: 0,
        arms: { L: { w: [0.20, 0.07, 0.74], e: [0.20, 0.08, 0.45], h: [0, 0, 1], n: [0, -1, 0] }, R: { w: [-0.20, 0.07, 0.74], e: [-0.20, 0.08, 0.45], h: [0, 0, 1], n: [0, -1, 0] } } }); };
    out.push({ id: 'plank', group: G, name: 'Forearm plank', sets: '3 × 30-45 s', A: mk(0.37), B: mk(0.385),
      phases: ['Set', 'Hold', 'Hold', 'Hold'], cues: ['Elbows under the shoulders, forearms flat, toes on the floor.', 'Body in one straight line from head to heels.', 'Glutes and abs tight, do not let the hips sag or pike.', 'Breathe steadily, stop when the line breaks.'], tempo: [1.5, 2.0, 1.5, 2.0], view: 'side',
      build: G2 => { box(G2, 0.8, 0.012, 2.2, 0, 0.005, -0.3, MT.blk); } });
  }

  // ---- mountain climber ----
  {
    const Lb = 1.35, ay = AY + 0.03, hz = 0.55, handY = 0.02;
    const az = hz - Math.sqrt(Lb * Lb - (handY + 0.53 - ay) * (handY + 0.53 - ay));
    const Sy = handY + 0.53 + 0.07, k = 0.466 / Lb, sz = hz;
    const H = [Sy + (ay - Sy) * k, sz + (az - sz) * k], t = Math.atan2(sz - H[1], Sy - H[0]) * 180 / Math.PI;
    const mk = (L, R, pfL, pfR) => stand({ H, p: t, t, feet: { L, R }, pf: { L: pfL, R: pfR }, out: 4, fr: 'w', curl: 0, retract: 0, kp: [0, 0.5, 1],
      arms: { L: { w: [0.22, handY + 0.07, hz], e: [0.30, 0.30, hz - 0.28], h: [0, 0, 1], n: [0, -1, 0] }, R: { w: [-0.22, handY + 0.07, hz], e: [-0.30, 0.30, hz - 0.28], h: [0, 0, 1], n: [0, -1, 0] } } });
    const drive = x => [x, 0.28, 0.12], back = x => [x, ay, az];
    out.push({ id: 'climber', group: G, name: 'Mountain climber', sets: 'HIIT 20 s on', A: mk(drive(0.10), back(-0.10), 20, 58), B: mk(back(0.10), drive(-0.10), 58, 20),
      phases: ['Drive R', 'Switch', 'Drive L', 'Switch'], cues: ['High plank, hands under the shoulders, body in one line.', 'Drive one knee toward the chest while the other leg stays long.', 'Switch legs quickly, hips stay low and level.', 'Keep a steady fast rhythm, breathe.'], tempo: [0.15, 0.3, 0.15, 0.3], view: 'side',
      build: G2 => { box(G2, 0.8, 0.012, 2.2, 0, 0.005, -0.3, MT.blk); } });
  }

  // ---- rowing machine ----
  {
    const ankleF = x => [x, 0.30, 0.86];
    const mk = (hz, t, hy, hzh) => stand({ H: [0.47, hz], p: t * 0.8, t, nk: t * 0.5, hd: t * 0.3, feet: { L: ankleF(0.14), R: ankleF(-0.14) }, kp: [0, 1, 0.1], pf: { L: -30, R: -30 }, out: 8, fr: 'w', curl: 0.95, retract: 0,
      arms: { L: { w: [0.12, hy, hzh], e: [0.20, hy + 0.15, hzh - 0.3], h: [0, 0, 1], n: [0, -1, 0] }, R: { w: [-0.12, hy, hzh], e: [-0.20, hy + 0.15, hzh - 0.3], h: [0, 0, 1], n: [0, -1, 0] } } });
    out.push({ id: 'rower', group: G, name: 'Rowing machine', sets: 'HIIT 20 s on', A: mk(0.37, 28, 0.50, 0.80), B: mk(-0.02, -22, 0.70, 0.05),
      phases: ['Catch', 'Drive', 'Finish', 'Recover'], cues: ['Shins vertical, arms long, back tall, handle level with the feet.', 'Legs first, then lean back, then pull the handle to the ribs.', 'Legs straight, slight lean back, handle at the lower ribs.', 'Arms first, then lean forward, then bend the knees. Slow on the way back.'], tempo: [0.3, 0.9, 0.3, 1.5], view: 'side',
      build: (G2, Dn) => { box(G2, 0.12, 0.05, 2.3, 0, 0.22, 0.1, MT.frame); box(G2, 0.5, 0.35, 0.05, 0, 0.35, 0.86, MT.frame, -0.5); box(G2, 0.5, 0.55, 0.45, 0, 0.3, 1.25, MT.stack);
        const seat = box(Dn, 0.26, 0.05, 0.3, 0, 0.36, 0, MT.pad); const hdl = mkHandle('bar', 0.4); Dn.add(hdl); const ch = seg(Dn, 0.006, MT.frame);
        return () => { const hp = mid(bone('LeftUpLeg'), bone('RightUpLeg')); seat.position.set(0, 0.36, hp.z); const h = FH(); if (h.L) { const c = mid(h.L.handle, h.R.handle); place(hdl, c, V(1, 0, 0)); ch.set(V(0, 0.4, 1.05), c); } }; } });
  }
  return out;
}
