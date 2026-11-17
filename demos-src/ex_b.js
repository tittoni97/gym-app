import shared from './shared.js';
export default function (C0) {
  const C = shared(C0);
  const { V, D, M, AY, LEG, HZ0, sym, stand, ankleFrom, box, cylX, cylY, cylZ, bench, seatBack, stackTower, MT, bar, FH, barFromHands, dbs, kbHeld, cable, mid, pair, seg, place, mkMesh, THREE, bone, wp, B, mkHandle, mkDumbbell } = C;
  const out = [];
  const SY = AY + LEG - 0.012;
  const mx = a => [-a[0], a[1], a[2]];
  const feet2 = (L, o = {}) => Object.assign({ L, R: mx(L) }, o);
  const posts = (Dn) => [-1, 1].map(sx => { box(Dn, 0.06, 2.3, 0.06, sx * 0.72, 1.15, 0, MT.frame); return box(Dn, 0.04, 2.3, 0.02, sx * 0.72, 1.15, 0.04, MT.red); });
  const smith = Dn => C.smithRails(null, Dn);
  const handleBetween = (Dn, kind = 'bar', len = 0.5) => { const h = mkHandle(kind, len); Dn.add(h); return () => { const hh = FH(); if (hh.L) place(h, mid(hh.L.handle, hh.R.handle), hh.L.handle.clone().sub(hh.R.handle).add(V(1e-4, 0, 0))); }; };

  // =============== CHEST ===============
  const supine = (o = {}) => stand(Object.assign({ H: [0.56, -0.18], p: -75, t: -90, nk: -88, hd: -86,
    feet: feet2([0.26, AY, 0.34]), out: 20, kp: [0.3, 1, 0.3], retract: 20, curl: 0.95, hr: 0.014 }, o));
  const benchProps = (G2) => { bench(G2, -0.62, 0.52, 0.47); for (const sx of [-1, 1]) box(G2, 0.06, 1.2, 0.06, sx * 0.3, 0.6, -0.78, MT.frame); };
  const barArmsA = pair([0.20, 0.54, 0.0], [0.22, 0.27, 0.0], [0, 1, 0], [0, 0, 1]);
  const barArmsB = pair([0.22, 0.15, 0.14], [0.34, 0.0, 0.05], [0, 1, 0], [0, 0, 1]);
  const benchCues = ['Shoulder blades pinched, feet flat, bar over the chest.', 'Lower under control to the lower chest, elbows about 45° from the body.', 'Light touch, no bounce.', 'Press up and slightly back over the shoulders.'];
  out.push({ id: 'bench', group: 'Chest', name: 'Barbell bench press', sets: '4 × 6-8', bar: true, A: supine({ arms: barArmsA }), B: supine({ arms: barArmsB }),
    phases: ['Set', 'Lower', 'Touch', 'Press'], cues: benchCues, tempo: [1.0, 2.0, 0.5, 1.0], view: 'side',
    build: (G2, Dn) => { benchProps(G2); return barFromHands; } });
  const sbA = pair([0.20, 0.54, 0.12], [0.22, 0.27, 0.12], [0, 1, 0], [0, 0, 1]), sbB = pair([0.22, 0.15, 0.12], [0.34, 0.0, 0.12], [0, 1, 0], [0, 0, 1]);
  out.push({ id: 'smithbench', group: 'Chest', name: 'Smith machine bench press', sets: '3 × 8-10', bar: true, A: supine({ arms: sbA }), B: supine({ arms: sbB }),
    phases: ['Set', 'Lower', 'Touch', 'Press'], cues: ['Bench under the bar so it lands on the lower chest, feet flat.', 'Lower to the lower chest, elbows about 45°.', 'Touch lightly, no bounce.', 'Press up; the machine fixes the path.'], tempo: [1.0, 2.0, 0.5, 1.0], view: 'side',
    build: (G2, Dn) => { benchProps(G2); smith(Dn); return barFromHands; } });
  {
    const aA = pair([0.20, 0.54, 0.0], [0.22, 0.27, 0.0], [0, 1, 0], [0, 0, 1]);
    const aB = pair([0.27, 0.15, 0.10], [0.42, 0.0, 0.05], [0, 1, 0], [0, 0, 1]);
    out.push({ id: 'dbbench', group: 'Chest', name: 'Dumbbell bench press', sets: '3 × 8-10', A: supine({ arms: aA }), B: supine({ arms: aB }),
      phases: ['Set', 'Lower', 'Stretch', 'Press'], cues: ['Dumbbells over the shoulders, shoulder blades pinched, feet flat.', 'Lower in a slight arc until the elbows are just below the bench.', 'Feel the stretch across the chest, wrists stacked over the elbows.', 'Press up and slightly in.'], tempo: [1.0, 2.0, 0.5, 1.0], view: 'side',
      build: (G2, Dn) => { benchProps(G2); return dbs(Dn); } });
  }
  {
    const inc = (arms) => stand({ H: [0.57, -0.10], p: -50, t: -58, nk: -50, hd: -48, feet: feet2([0.26, AY, 0.40]), out: 20, kp: [0.3, 1, 0.3], retract: 20, curl: 0.95, hr: 0.014, arms });
    const aA = pair([0.20, 0.52, 0.06], [0.22, 0.27, 0.04], [0, 1, 0], [0, 0.3, 1]);
    const aB = pair([0.27, 0.14, 0.10], [0.40, -0.02, 0.06], [0, 1, 0], [0, 0.3, 1]);
    out.push({ id: 'inclinepress', group: 'Chest', name: 'Incline dumbbell press', sets: '3 × 10', A: inc(aA), B: inc(aB),
      phases: ['Set', 'Lower', 'Stretch', 'Press'], cues: ['Bench at about 30°, dumbbells over the upper chest, shoulder blades pinched.', 'Lower with elbows about 45° out, light dumbbells for the shoulder.', 'Stop when the elbows reach torso level, no deeper.', 'Press up and slightly together, stop if the shoulder pinches.'], tempo: [1.0, 2.0, 0.5, 1.0], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.05, 0.47, 1.0, 0.32, 0.8); return dbs(Dn); } });
  }
  {
    const H = [0.56, -0.20];
    const mk = (z, ey) => stand({ H, p: -4, t: -6, nk: -4, hd: -3, feet: feet2([0.18, AY, 0.20]), out: 14, retract: 10, curl: 0.9,
      arms: pair([0.20, -0.10, z], [0.28, ey, z - 0.28], [0, 0, 1], [-1, 0, 0]) });
    out.push({ id: 'chestmachine', group: 'Chest', name: 'Vertical bench press machine', sets: '3 × 8-10', A: mk(0.18, -0.20), B: mk(0.52, -0.12),
      phases: ['Set', 'Press', 'Top', 'Return'], cues: ['Seat set so the handles are at mid-chest, back flat on the pad.', 'Push the handles straight forward, shoulders down.', 'Arms almost straight, do not lock the elbows.', 'Come back slowly until you feel a light stretch in the chest.'], tempo: [0.8, 1.2, 0.6, 1.8], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.20, 0.46, 0.12, 0.36, 0.7); stackTower(G2, -0.75);
        const l1 = seg(Dn, 0.015, MT.frame), l2 = seg(Dn, 0.015, MT.frame);
        return () => { const h = FH(); if (!h.L) return; l1.set(V(0.28, 1.15, -0.55), h.L.handle); l2.set(V(-0.28, 1.15, -0.55), h.R.handle); }; } });
  }
  // push-ups: geometry from hand position, body line and shoulder height
  const pushPose = (handY, shY, hz = 0.55) => {
    const Lb = 1.35, ay = AY + 0.03, ax = -0.10;
    const Sy = shY, Sz = (a => a)(0) + (0);
    const az = hz - Math.sqrt(Lb * Lb - (handY + 0.53 - ay) * (handY + 0.53 - ay));   // ankle z from the straight-arm pose
    const sz = az + Math.sqrt(Lb * Lb - (Sy - ay) * (Sy - ay));
    const k = 0.466 / Lb, H = [Sy + (ay - Sy) * k, sz + (az - sz) * k];
    const t = Math.atan2(sz - H[1], Sy - H[0]) * 180 / Math.PI;
    const el = shY > handY + 0.45 ? [0.30, (Sy + handY) / 2 + 0.02, hz - 0.28] : [0.34, handY + 0.26, hz - 0.30];
    return stand({ H, p: t, t, feet: feet2([0.10, ay, az]), pf: { L: 58, R: 58 }, out: 4, fr: 'w', curl: 0, retract: 0,
      arms: { L: { w: [0.22, handY + 0.07, hz], e: el, h: [0, 0, 1], n: [0, -1, 0] }, R: { w: [-0.22, handY + 0.07, hz], e: mx(el), h: [0, 0, 1], n: [0, -1, 0] } } });
  };
  out.push({ id: 'pushup', group: 'Chest', name: 'Push-up', sets: '3 × max', A: pushPose(0.02, 0.02 + 0.53 + 0.07 - 0.0), B: pushPose(0.02, 0.27),
    phases: ['Plank', 'Lower', 'Bottom', 'Push'], cues: ['Hands under the shoulders, body in one straight line, glutes and abs tight.', 'Lower the chest to the floor, elbows about 45° from the body.', 'Chest an inch above the floor, hips do not sag.', 'Push the floor away, keep the line.'], tempo: [0.8, 1.6, 0.4, 1.0], view: 'side',
    build: G2 => { box(G2, 0.8, 0.012, 2.2, 0, 0.005, -0.3, MT.blk); } });
  out.push({ id: 'pushupinc', group: 'Chest', name: 'Incline push-up', sets: '3 × 8-10', A: pushPose(0.47, 0.47 + 0.53 + 0.07), B: pushPose(0.47, 0.47 + 0.30),
    phases: ['Plank', 'Lower', 'Bottom', 'Push'], cues: ['Hands on the bench, under the shoulders, body in one straight line.', 'Lower the chest to the bench, elbows about 45°.', 'Chest an inch from the bench, hips level.', 'Push away, keep the line.'], tempo: [0.8, 1.6, 0.4, 1.0], view: 'side',
    build: G2 => { box(G2, 0.7, 0.45, 0.35, 0, 0.225 + 0.01, 0.55, MT.pad); } });
  {
    const mk = (sy, t, hy) => stand({ H: [sy - 0.46, -0.04], p: t, t, nk: 0, hd: 0, feet: feet2([0.10, sy - 1.06, -0.32]), kp: [0, 0, 1], out: 2, fr: 'w', curl: 0.9, retract: 5,
      arms: { L: { w: [0.26, 1.10, 0.0], e: [0.30, hy, -0.16], h: [0, 0, 1], n: [-1, 0, 0] }, R: { w: [-0.26, 1.10, 0.0], e: [-0.30, hy, -0.16], h: [0, 0, 1], n: [-1, 0, 0] } } });
    out.push({ id: 'dip', group: 'Chest', name: 'Assisted dips', sets: '3 × 8-10', A: mk(1.60, 6, 1.35), B: mk(1.40, 20, 1.14),
      phases: ['Top', 'Lower', 'Bottom', 'Press'], cues: ['Hands on the bars, shoulders down, knees on the pad, chest slightly forward.', 'Lower until the elbows reach about 90°.', 'Stay tight, do not drop into the shoulders.', 'Press up until the arms are straight, no shrugging.'], tempo: [0.8, 1.6, 0.4, 1.2], view: 'side',
      build: (G2, Dn) => { for (const sx of [-1, 1]) { box(G2, 0.05, 1.15, 0.05, sx * 0.26, 0.58, 0.28, MT.frame); box(G2, 0.05, 1.15, 0.05, sx * 0.26, 0.58, -0.28, MT.frame); cylZ(G2, 0.022, 0.7, sx * 0.26, 1.10, 0, MT.blk); } return null; } });
  }

  // =============== SHOULDERS ===============
  const seated = (arms, o = {}) => stand(Object.assign({ H: [0.56, -0.20], p: -2, t: -4, nk: -2, hd: -2, feet: feet2([0.18, AY, 0.20]), out: 14, arms, curl: 0.9, retract: 8 }, o));
  {
    const aA = pair([0.28, 0.02, 0.08], [0.34, -0.22, -0.02], [0, 1, 0.1], [-0.7, 0, 0.7]);
    const aB = pair([0.22, 0.60, 0.03], [0.26, 0.30, 0.0], [0, 1, 0.1], [-0.7, 0, 0.7]);
    out.push({ id: 'shoulderpress', group: 'Shoulders', name: 'Shoulder press machine', sets: '3 × 10', A: seated(aA), B: seated(aB),
      phases: ['Set', 'Press', 'Top', 'Lower'], cues: ['Seat height so the handles are level with your ears, back flat on the pad.', 'Press straight up without arching the back.', 'Almost straight arms, shoulders away from the ears.', 'Lower slowly back to ear level.'], tempo: [0.8, 1.3, 0.6, 1.8], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.20, 0.46, 0.10, 0.36, 0.95); stackTower(G2, -0.7);
        const l1 = seg(Dn, 0.015, MT.frame), l2 = seg(Dn, 0.015, MT.frame);
        return () => { const h = FH(); if (!h.L) return; l1.set(V(0.30, 1.9, -0.35), h.L.handle); l2.set(V(-0.30, 1.9, -0.35), h.R.handle); }; } });
  }
  {
    const aA = pair([0.30, 0.03, 0.06], [0.36, -0.22, -0.02], [0, 1, 0.1], [0, 1, 0.3]);
    const aB = pair([0.20, 0.60, 0.03], [0.24, 0.30, 0.0], [0, 1, 0.1], [0, 1, 0.3]);
    out.push({ id: 'dbshoulder', group: 'Shoulders', name: 'Dumbbell shoulder press', sets: '3 × 10', A: seated(aA), B: seated(aB),
      phases: ['Set', 'Press', 'Top', 'Lower'], cues: ['Dumbbells at ear level, palms forward, back against the pad.', 'Press up and slightly in, ribs down.', 'Arms nearly straight, dumbbells over the shoulders.', 'Lower to ear level under control.'], tempo: [0.8, 1.3, 0.6, 1.8], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.20, 0.46, 0.10, 0.36, 0.95); return dbs(Dn); } });
    const ssA = pair([0.30, 0.03, 0.05], [0.36, -0.22, 0.02], [0, 1, 0.1], [0, 1, 0.3]), ssB = pair([0.30, 0.60, 0.05], [0.34, 0.30, 0.02], [0, 1, 0.1], [0, 1, 0.3]);
    out.push({ id: 'smithshoulder', group: 'Shoulders', name: 'Smith machine shoulder press', sets: '3 × 8-10', bar: true, A: seated(ssA), B: seated(ssB),
      phases: ['Set', 'Press', 'Top', 'Lower'], cues: ['Bench upright, bar at chin height, forearms vertical.', 'Press straight up, head moves slightly back then forward.', 'Arms nearly straight.', 'Lower to chin level.'], tempo: [0.8, 1.3, 0.6, 1.8], view: 'side',
      build: (G2, Dn) => { seatBack(G2, -0.20, 0.46, 0.10, 0.36, 0.95); smith(Dn); return barFromHands; } });
  }

  // =============== BACK ===============
  {
    const mk = (t, arms) => stand({ H: [0.43, -0.15], p: t * 0.6, t, nk: t * 0.3, hd: 0, feet: feet2([0.20, 0.34, 0.66]), kp: [0, 1, 0.1], out: 6, arms, curl: 0.9, retract: 0 });
    const aA = pair([0.10, -0.20, 0.56], [0.17, -0.18, 0.28], [0, 0, 1], [-1, 0, 0]);
    const aB = pair([0.12, -0.28, 0.20], [0.26, -0.26, -0.18], [0, 0, 1], [-1, 0, 0]);
    out.push({ id: 'lowrow', group: 'Back', name: 'Seated low row', sets: '3 × 8-12', A: mk(14, aA), B: mk(-4, aB),
      phases: ['Reach', 'Pull', 'Squeeze', 'Return'], cues: ['Feet on the plate, knees slightly bent, arms long, shoulders relaxed.', 'Pull the handle to your belly, elbows close to the body.', 'Squeeze the shoulder blades together, chest tall.', 'Let the arms extend slowly, do not round the back.'], tempo: [0.8, 1.2, 0.8, 1.8], view: 'side',
      build: (G2, Dn) => { box(G2, 0.4, 0.06, 0.4, 0, 0.3, -0.15, MT.pad); box(G2, 0.5, 0.35, 0.05, 0, 0.3, 0.78, MT.frame, -0.4); stackTower(G2, 1.45, 0, 1.6);
        const hdl = handleBetween(Dn, 'v'); const cab = cable(Dn, V(0, 0.55, 1.28)); return () => { hdl(); const h = FH(); if (h.L) cab(mid(h.L.handle, h.R.handle)); }; } });
  }
  {
    const mkL = (arm) => stand({ H: [0.80, -0.34], p: 62, t: 74, nk: 40, hd: 20, feet: { L: [0.20, 0.60, -0.45], R: [-0.30, AY, -0.12] }, out: 6, fr: 'w', curl: 0.9, retract: 0, arms: arm });
    const lw = { w: [0.20, 0.54, 0.22], e: [0.22, 0.72, 0.17], h: [0, 0, 1], n: [0, -1, 0] };
    const rA = { w: [-0.16, 0.38, 0.12], e: [-0.18, 0.64, 0.12], h: [0, -1, 0.1], n: [1, 0, 0] };
    const rB = { w: [-0.20, 0.82, -0.04], e: [-0.26, 0.90, -0.28], h: [0, -0.8, 0.3], n: [1, 0, 0] };
    const A = mkL({ L: lw, R: rA }), Bp = mkL({ L: lw, R: rB });
    delete A.kp; delete Bp.kp;
    out.push({ id: 'dbrow', group: 'Back', name: 'One-arm dumbbell row', sets: '3 × 10 each arm', A, B: Bp,
      phases: ['Hang', 'Row', 'Squeeze', 'Lower'], cues: ['One hand and knee on the bench, back flat, dumbbell hanging under the shoulder.', 'Pull the elbow up and back toward the hip.', 'Squeeze the shoulder blade, torso stays still.', 'Lower the dumbbell slowly until the arm is straight.'], tempo: [0.8, 1.2, 0.8, 1.8], view: 'side',
      build: (G2, Dn) => { box(G2, 0.3, 0.45, 1.0, 0.2, 0.245, 0.0, MT.pad); const d = mkDumbbell(); Dn.add(d); return () => { const h = FH(); if (h.R) place(d, h.R.handle, h.R.across); }; } });
  }
  {
    const mk = (arms, t = -10) => stand({ H: [0.56, -0.12], p: -6, t, nk: t * 0.5, hd: t * 0.3, feet: feet2([0.20, AY, 0.30]), out: 12, arms, curl: 0.9, retract: 0 });
    const wide = (y, z, ez, ex) => pair([ex, y, z], [ex + 0.10, y - 0.25 * (y > 0.3 ? 0 : -1), ez], [0, 1, 0.1], [0, 0, 1]);
    const gA = pair([0.38, 0.52, 0.0], [0.42, 0.26, 0.0], [0, 1, 0.1], [0, 0, 1]);
    const gB = pair([0.34, -0.04, 0.14], [0.46, -0.06, -0.20], [0, 1, 0.1], [0, 0, 1]);
    const nA = pair([0.12, 0.51, 0.06], [0.20, 0.28, 0.0], [0, 1, 0.1], [-1, 0, 0]);
    const nB = pair([0.12, -0.10, 0.18], [0.24, -0.30, -0.06], [0, 1, 0.1], [-1, 0, 0]);
    const build = kind => (G2, Dn) => {
      seatBack(G2, -0.12, 0.46, 0.12, 0.34, 0.4); box(G2, 0.1, 0.12, 0.36, 0.2, 0.62, 0.28, MT.pad); box(G2, 0.1, 0.12, 0.36, -0.2, 0.62, 0.28, MT.pad); stackTower(G2, -0.8, 0, 2.2);
      const hdl = handleBetween(Dn, kind, kind === 'bar' ? 0.95 : 0.2); const cab = cable(Dn, V(0, 2.25, 0.0)); return () => { hdl(); const h = FH(); if (h.L) cab(mid(h.L.handle, h.R.handle)); };
    };
    const cues = ['Thighs locked under the pads, lean back slightly, arms long.', 'Pull the elbows down and back, drive them toward your hips.', 'Bar touches the upper chest, shoulder blades down and together.', 'Let the bar rise slowly until the arms are long again.'];
    out.push({ id: 'pulldown', group: 'Back', name: 'Lat pulldown', sets: '4 × 8-12', A: mk(gA), B: mk(gB), phases: ['Reach', 'Pull', 'Squeeze', 'Return'], cues, tempo: [0.8, 1.3, 0.8, 1.8], view: 'side', build: build('bar') });
    out.push({ id: 'pulldownN', group: 'Back', name: 'Neutral-grip pulldown', sets: '3 × 10-12', A: mk(nA), B: mk(nB), phases: ['Reach', 'Pull', 'Squeeze', 'Return'], cues: ['Neutral handle, thighs under the pads, lean back slightly.', 'Pull the elbows down toward your ribs.', 'Handle to the upper chest, shoulders down.', 'Return slowly, arms long.'], tempo: [0.8, 1.3, 0.8, 1.8], view: 'side', build: build('v') });
  }
  {
    const mk = (sy, arms, t) => stand({ H: [sy - 0.46, 0.0], p: t, t, nk: 0, hd: 0, feet: feet2([0.10, sy - 1.02, -0.30]), kp: [0, 0, 1], out: 2, fr: 'w', curl: 0.95, retract: 0, arms });
    const grip = (x, n, ey, ez) => ({ L: { w: [x, 2.07, 0.0], e: [x + 0.04, ey, ez], h: [0, 1, 0], n }, R: { w: [-x, 2.07, 0.0], e: [-x - 0.04, ey, ez], h: [0, 1, 0], n: [-n[0], n[1], n[2]] } });
    out.push({ id: 'assistpull', group: 'Back', name: 'Assisted pull-up', sets: '4 × 6-10', A: mk(1.52, grip(0.38, [0, 0, 1], 1.78, 0.0), 4), B: mk(1.94, grip(0.38, [0, 0, 1], 1.74, -0.12), -6),
      phases: ['Hang', 'Pull', 'Top', 'Lower'], cues: ['Hands wider than shoulders, knees on the pad, shoulders pulled down, ribs tight.', 'Pull the elbows down to your sides, chest toward the bar.', 'Chin over the bar, do not swing.', 'Lower slowly to a full hang with straight arms.'], tempo: [0.8, 1.6, 0.6, 2.0], view: 'three',
      build: (G2, Dn) => { box(G2, 1.0, 0.06, 0.06, 0, 2.02, 0.0, MT.frame); cylX(G2, 0.016, 1.0, 0, 2.05, 0, MT.frame); box(G2, 0.06, 2.0, 0.06, 0.55, 1.0, 0.0, MT.frame); box(G2, 0.06, 2.0, 0.06, -0.55, 1.0, 0.0, MT.frame);
        const pad = box(Dn, 0.34, 0.06, 0.3, 0, 0, 0, MT.pad); return () => { const k = mid(bone('LeftLeg'), bone('RightLeg')); pad.position.set(0, k.y - 0.08, k.z); }; } });
    out.push({ id: 'assistchin', group: 'Back', name: 'Assisted chin-up', sets: '4 × 6-10', A: mk(1.52, grip(0.17, [0, 0, -1], 1.82, 0.02), 4), B: mk(1.94, grip(0.17, [0, 0, -1], 1.76, -0.10), -6),
      phases: ['Hang', 'Pull', 'Top', 'Lower'], cues: ['Palms toward you, shoulder-width grip, knees on the pad.', 'Pull the elbows down and forward toward your ribs.', 'Chin over the bar, chest up.', 'Lower slowly to a full hang.'], tempo: [0.8, 1.6, 0.6, 2.0], view: 'three',
      build: (G2, Dn) => { cylX(G2, 0.016, 1.0, 0, 2.05, 0, MT.frame); box(G2, 0.06, 2.0, 0.06, 0.55, 1.0, 0.0, MT.frame); box(G2, 0.06, 2.0, 0.06, -0.55, 1.0, 0.0, MT.frame);
        const pad = box(Dn, 0.34, 0.06, 0.3, 0, 0, 0, MT.pad); return () => { const k = mid(bone('LeftLeg'), bone('RightLeg')); pad.position.set(0, k.y - 0.08, k.z); }; } });
  }
  {
    const mk = (t, arms) => stand({ H: [0.15, -0.20], p: 0, t, nk: t * 0.3, hd: 0, feet: feet2([0.12, AY + 0.02, 0.62]), kp: [0, 1, 0], out: 6, arms, curl: 0.9 });
    const aA = pair([0.10, -0.12, 0.56], [0.16, -0.12, 0.28], [0, 0, 1], [-1, 0, 0]);
    const aB = pair([0.12, -0.30, 0.18], [0.26, -0.24, -0.20], [0, 0, 1], [-1, 0, 0]);
    out.push({ id: 'bandrow', group: 'Back', name: 'Band row', sets: '3 × 12-15', A: mk(12, aA), B: mk(-2, aB),
      phases: ['Reach', 'Pull', 'Squeeze', 'Return'], cues: ['Sit tall, band around the feet, knees slightly bent, arms long.', 'Pull the band to your belly, elbows close to the body.', 'Squeeze the shoulder blades together.', 'Return slowly, keep the chest up.'], tempo: [0.8, 1.2, 0.8, 1.6], view: 'side',
      build: (G2, Dn) => { box(G2, 0.8, 0.012, 2.0, 0, 0.005, 0.3, MT.blk); const bnd = seg(Dn, 0.01, MT.band); return () => { const h = FH(); if (h.L) bnd.set(mid(bone('LeftFoot'), bone('RightFoot')).add(V(0, 0.05, 0.1)), mid(h.L.handle, h.R.handle)); }; } });
  }
  {
    const mk = (arms) => stand({ H: [SY, HZ0 - 0.02], t: -4, p: -2, feet: feet2([0.14, AY, 0]), out: 10, arms, curl: 0.9, retract: 6 });
    const aA = pair([0.12, 0.0, 0.52], [0.18, -0.02, 0.26], [0, 0, 1], [-0.5, -0.8, 0]);
    const aB = pair([0.20, 0.04, 0.12], [0.32, 0.03, -0.22], [0, 0, 1], [-0.5, -0.8, 0]);
    out.push({ id: 'facepull', group: 'Back', name: 'Band face pull', sets: '2 × 15', A: mk(aA), B: mk(aB),
      phases: ['Reach', 'Pull', 'Hold', 'Return'], cues: ['Band anchored at face height, arms long, step back for tension.', 'Pull toward the face, elbows high and wide.', 'Hands beside the ears, squeeze the rear shoulders.', 'Return slowly with control, no shrugging.'], tempo: [0.8, 1.2, 0.8, 1.6], view: 'side',
      build: (G2, Dn) => { box(G2, 0.06, 1.9, 0.06, 0, 0.95, 1.1, MT.frame); const bnd = seg(Dn, 0.009, MT.band); return () => { const h = FH(); if (h.L) bnd.set(V(0, 1.5, 1.1), mid(h.L.handle, h.R.handle)); }; } });
  }
  return out;
}
