import shared from './shared.js';
export default function (C0, SQ) {
  const C = shared(C0);
  const { V, D, M, AY, LEG, HZ0, sym, stand, ankleFrom, box, cylX, cylY, cylZ, bench, seatBack, stackTower, MT, bar, FH, barFromHands, dbs, kbHeld, cable, mid, sqHip, pair, seg, place, mkMesh, THREE, bone, wp, B, mkHandle } = C;
  const out = [];
  const G = 'Legs & glutes';
  const SY = AY + LEG - 0.012;                 // standing hip height
  const mx = a => [-a[0], a[1], a[2]];
  const feet2 = (L, o = {}) => Object.assign({ L, R: mx(L) }, o);
  const sqArms = pair([0.27, -0.10, -0.10], [0.34, -0.23, 0.0], [0, 1, 0], [0, 0, 1]);
  const smithRails = C.smithRails;

  out.push({
    id: 'squat', group: G, name: 'Barbell squat', sets: '4 × 5-6', bar: true,
    phases: ['Brace', 'Down', 'Bottom', 'Drive up'],
    cues: ['Big breath into your belly and brace. Bar sits on your upper back, elbows down under it.',
      'Hips back and down together, knees follow your toes. About 2 seconds.',
      'Hip crease just below the knee. Stay tight, no bounce.',
      'Push the floor away through mid-foot. Chest and hips rise together.'],
    tempo: [1.2, 2.0, 0.8, 1.2], view: 'side', apply: s => SQ.squat(s)
  });

  out.push({
    id: 'smithsquat', group: G, name: 'Smith machine squat', sets: '3 × 8-10', bar: true,
    phases: ['Set', 'Down', 'Bottom', 'Up'],
    cues: ['Bar on the upper back, feet slightly in front of the bar line, brace.', 'Sit down and back; the machine fixes the path, so keep your chest up.', 'Thighs at least parallel, heels flat.', 'Drive up through the whole foot.'],
    tempo: [1.2, 2.0, 0.8, 1.2], view: 'side', apply: s => { const sh = SQ.TUN.shin; SQ.TUN.shin = 25; SQ.setSmith(true); SQ.squat(s); SQ.setSmith(false); SQ.TUN.shin = sh; }, build: smithRails
  });

  // ---- goblet squat ----
  {
    const arms = pair([0.07, -0.19, 0.17], [0.15, -0.40, 0.06], [0, 0.85, 0.5], [-1, 0, 0]);
    const A = stand({ arms, fr: 't', curl: 0.9, hr: 0.012, feet: feet2([0.16, AY, 0]), out: 18 });
    const Bq = stand({ H: sqHip(40, 94), p: 30, t: 36, arms, fr: 't', curl: 0.9, hr: 0.012, feet: feet2([0.20, AY, 0]), out: 26 });
    out.push({
      id: 'gobletsquat', group: G, name: 'Goblet squat', sets: '3 × 8-10', A, B: Bq,
      phases: ['Set', 'Down', 'Bottom', 'Up'],
      cues: ['Hold the kettlebell by the horns against your chest, elbows pointing down.', 'Sit between your knees, chest tall, elbows brushing the inside of the knees.', 'Hips below knees if you can, heels down.', 'Stand up by pushing the floor away.'],
      tempo: [1.0, 2.0, 0.6, 1.2], view: 'side', build: (G2, Dn) => kbHeld(Dn)
    });
  }

  // ---- leg press ----
  {
    const u = V(0, 0.64, 0.77), H = [0.40, -0.52];
    const ank = (d, x) => [x, H[0] + u.y * d, H[1] + u.z * d];
    const mk = d => stand({ H, p: -45, t: -50, nk: -42, hd: -40, feet: { L: ank(d, 0.20), R: ank(d, -0.20) }, kp: [0.35, 1, 0.3], pf: { L: 0, R: 0 }, fabs: -130, fup: [0, -0.64, -0.77], out: 3,
      arms: pair([0.22, -0.38, 0.10], [0.30, -0.25, -0.1], [0, 0, 1], [-1, 0, 0]), curl: 0.6 });
    out.push({
      id: 'legpress', group: G, name: 'Leg press', sets: '3 × 10-12', A: mk(0.80), B: mk(0.45),
      phases: ['Set', 'Lower', 'Bottom', 'Press'],
      cues: ['Back flat on the pad, feet shoulder-width, hips glued to the seat.', 'Bring the sled down until the knees are about 90°, no further than your hips allow.', 'Do not let your lower back peel off the pad.', 'Press through the whole foot, stop just short of locking the knees.'],
      tempo: [1.0, 2.0, 0.5, 1.2], view: 'side',
      build: (G2, Dn) => {
        seatBack(G2, -0.50, 0.31, 0.87, 0.36, 0.7);
        const pl = box(Dn, 0.7, 0.04, 0.55, 0, 0, 0, MT.frame, 0); pl.rotation.x = 0.87;
        const r1 = seg(Dn, 0.02, MT.frame), r2 = seg(Dn, 0.02, MT.frame);
        return () => {
          const m = mid(bone('LeftFoot'), bone('RightFoot'));
          pl.position.copy(m).addScaledVector(u, 0.105);
          r1.set(V(0.42, 0.15, -0.35), V(0.42, 0.15 + 0.64 * 1.5, -0.35 + 0.77 * 1.5)); r2.set(V(-0.42, 0.15, -0.35), V(-0.42, 0.15 + 0.64 * 1.5, -0.35 + 0.77 * 1.5));
        };
      }
    });
  }

  // ---- leg extension ----
  {
    const H = [0.56, -0.30];
    const mk = b => { const a = ankleFrom(H, 88, b, 0.11); return stand({ H, p: -4, t: -10, nk: -6, hd: -4, feet: feet2(a), kp: [0, 1, 0.2], pf: { L: -(30 + b * 0.95), R: -(30 + b * 0.95) }, out: 4,
      arms: pair([0.20, -0.34, 0.02], [0.28, -0.22, -0.12], [0, 0, 1], [-1, 0, 0]), curl: 0.6 }); };
    out.push({
      id: 'legext', group: G, name: 'Leg extension', sets: '3 × 12', A: mk(6), B: mk(84),
      phases: ['Set', 'Extend', 'Squeeze', 'Lower'],
      cues: ['Back against the pad, knees lined up with the machine pivot, pad on the lower shin.', 'Straighten the knees, thighs stay pressed down.', 'Hold one second at the top, quads tight.', 'Lower slowly, do not let the stack drop.'],
      tempo: [1.0, 1.2, 0.8, 2.0], view: 'side',
      build: (G2, Dn) => {
        seatBack(G2, -0.28, 0.46, 0.15, 0.34, 0.7); stackTower(G2, -0.95);
        const roller = cylX(Dn, 0.04, 0.3, 0, 0, 0, MT.pad); const lev = seg(Dn, 0.015, MT.frame);
        const hold = cylX(Dn, 0.04, 0.5, 0, 0, 0, MT.pad); const ha = [1, -1].map(() => seg(Dn, 0.02, MT.red));
        return () => { const a = bone('LeftFoot'), b = bone('RightFoot'), k = mid(bone('LeftLeg'), bone('RightLeg')), hp = mid(bone('LeftUpLeg'), bone('RightUpLeg')); const m = mid(a, b);
          const d = m.clone().sub(k).normalize(); roller.position.copy(m).add(V(0, 0.06, 0.06)).addScaledVector(d, -0.02); lev.set(V(0, 0.32, -0.12), roller.position);
          const hpos = k.clone().lerp(hp, 0.22).add(V(0, 0.095, 0)); hold.position.copy(hpos);
          ha.forEach((r, i) => { const sx = i ? -1 : 1; r.set(V(sx * 0.26, hpos.y, hpos.z), V(sx * 0.26, 1.05, -0.72)); }); };
      }
    });
  }

  // ---- leg curl (prone) ----
  {
    const H = [0.57, 0.0];
    const mk = b => { const a = ankleFrom(H, -88, b, 0.09); return stand({ H, p: 84, t: 88, nk: 70, hd: 52, feet: feet2(a), kp: [0, -0.6, -0.5], pf: { L: -20, R: -20 }, out: 0,
      arms: pair([0.20, -0.04, 0.35], [0.30, -0.06, 0.12], [0, 0, 1], [-1, 0, 0]), curl: 0.8 }); };
    out.push({
      id: 'legcurl', group: G, name: 'Leg curl', sets: '3 × 10-12', A: mk(-96), B: mk(-165),
      phases: ['Set', 'Curl', 'Squeeze', 'Lower'],
      cues: ['Lie face down, pad just above the heels, hips pressed into the bench.', 'Curl the heels toward your glutes without lifting the hips.', 'Squeeze the hamstrings for a second.', 'Lower slowly until the legs are almost straight.'],
      tempo: [1.0, 1.2, 0.8, 2.0], view: 'side',
      build: (G2, Dn) => {
        bench(G2, -0.62, 0.55, 0.47, 0.34); stackTower(G2, -1.1);
        const roller = cylX(Dn, 0.035, 0.3, 0, 0, 0, MT.pad); const lev = seg(Dn, 0.015, MT.frame);
        return () => { const m = mid(bone('LeftFoot'), bone('RightFoot')); roller.position.copy(m).add(V(0, 0.05, 0.07)); lev.set(V(0, 0.45, -1.0), roller.position); };
      }
    });
  }

  // ---- calf raise (machine) ----
  {
    const mk = (dy, pf) => stand({ H: [SY + dy, HZ0], feet: feet2([0.12, AY + dy, 0.02]), pf: { L: pf, R: pf }, out: 4, t: 0,
      arms: pair([0.28, -0.14, 0.06], [0.32, -0.32, -0.06], [0, 0.7, 0.7], [-0.7, 0, 0.7]), curl: 0.6 });
    out.push({
      id: 'calf', group: G, name: 'Calf raise (machine)', sets: '3 × 12-15', A: mk(0.03, -8), B: mk(0.13, 52),
      phases: ['Set', 'Rise', 'Top', 'Lower'],
      cues: ['Shoulders under the pads, balls of the feet on the step, knees almost straight.', 'Rise as high as you can onto your toes.', 'Pause one second at the top.', 'Lower slowly into a full stretch below the step.'],
      tempo: [0.8, 1.2, 1.0, 2.0], view: 'side',
      build: (G2, Dn) => {
        box(G2, 0.5, 0.07, 0.3, 0, 0.035 + 0.01, 0.1, MT.frame); box(G2, 0.5, 0.03, 0.9, 0, 0.015, 0.0, MT.blk);
        box(G2, 0.08, 1.9, 0.08, 0.32, 0.95, -0.28, MT.frame); box(G2, 0.08, 1.9, 0.08, -0.32, 0.95, -0.28, MT.frame);
        const pad = box(Dn, 0.5, 0.08, 0.2, 0, 0, 0, MT.pad);
        return () => { const c = mid(bone('LeftArm'), bone('RightArm')); pad.position.set(0, c.y - 0.03, c.z - 0.02); };
      }
    });
  }

  // ---- Smith calf raise ----
  {
    const mk = (dy, pf) => stand({ H: [SY + dy, HZ0], feet: feet2([0.12, AY + dy, 0.02]), pf: { L: pf, R: pf }, out: 4, arms: sqArms, retract: 25, depress: -10, curl: 0.95 });
    out.push({
      id: 'smithcalf', group: G, name: 'Smith machine calf raise', sets: '3 × 12-15', bar: true, A: mk(0.03, -8), B: mk(0.13, 52),
      phases: ['Set', 'Rise', 'Top', 'Lower'],
      cues: ['Bar on the upper back, balls of the feet on a plate or step.', 'Rise high onto your toes.', 'Pause one second at the top.', 'Lower into a full stretch.'],
      tempo: [0.8, 1.2, 1.0, 2.0], view: 'side',
      build: (G2, Dn) => { box(G2, 0.5, 0.07, 0.3, 0, 0.045, 0.1, MT.frame); const up = smithRails(G2, Dn); return () => { barFromHands(); up(); }; }
    });
  }

  // ---- split squat ----
  {
    const dbArms = pair([0.19, -0.54, 0.0], [0.22, -0.27, -0.06], [0, -1, 0], [-1, 0, 0]);
    const mk = (hy, hz) => stand({ H: [hy, hz], t: 0, feet: { L: [0.11, AY, 0.40], R: [-0.11, AY + 0.07, -0.40] }, pf: { L: 0, R: 52 }, out: 4, arms: dbArms, curl: 0.9 });
    out.push({
      id: 'splitsquat', group: G, name: 'Split squat', sets: '3 × 8 each leg', A: mk(0.86, -0.02), B: mk(0.52, -0.03),
      phases: ['Set', 'Down', 'Bottom', 'Up'],
      cues: ['Long stance, front foot flat, back heel up, torso tall. Dumbbells at your sides.', 'Drop the back knee straight down toward the floor.', 'Front shin near vertical, back knee just above the floor.', 'Push through the front foot to stand. Do not lean forward.'],
      tempo: [0.8, 1.8, 0.6, 1.2], view: 'side', build: (G2, Dn) => dbs(Dn)
    });
  }

  // ---- step-up ----
  {
    const dbArms = pair([0.19, -0.54, 0.0], [0.22, -0.27, -0.06], [0, -1, 0], [-1, 0, 0]);
    const A = stand({ H: [0.98, 0.14], t: 8, feet: { L: [0.12, AY + 0.38, 0.30], R: [-0.12, AY, -0.02] }, pf: { L: 0, R: 0 }, arms: dbArms, curl: 0.9, kp: [0, 0.3, 1] });
    const Bp = stand({ H: [AY + 0.38 + LEG - 0.02, 0.30], t: 2, feet: { L: [0.12, AY + 0.38, 0.30], R: [-0.12, AY + 0.38 + 0.14, 0.34] }, pf: { L: 0, R: 20 }, arms: dbArms, curl: 0.9, kp: [0, 0.3, 1] });
    out.push({
      id: 'stepup', group: G, name: 'Step-up', sets: '3 × 10 each leg', A, B: Bp, mid: { feet: { R: [-0.12, AY + 0.60, 0.05] } },
      phases: ['Set', 'Step up', 'Top', 'Step down'],
      cues: ['Whole foot on the box, dumbbells at your sides.', 'Drive through the front heel; do not push off the back foot.', 'Stand tall on the box, other knee up.', 'Lower slowly, the back foot touches the floor lightly.'],
      tempo: [0.8, 1.4, 0.6, 1.8], view: 'side', build: (G2, Dn) => { box(G2, 0.55, 0.38, 0.45, 0, 0.19 + 0.02, 0.41, MT.pad); return dbs(Dn); }
    });
  }

  // ---- abductor machine ----
  {
    const H = [0.55, -0.25];
    const mk = x => stand({ H, p: -4, t: -6, nk: -4, hd: -3, feet: feet2([x, AY, 0.17]), kp: [0.8, 0.6, 0.7], out: 20,
      arms: pair([0.22, -0.34, 0.04], [0.30, -0.22, -0.12], [0, 0, 1], [-1, 0, 0]), curl: 0.6 });
    out.push({
      id: 'abductor', group: G, name: 'Abductor machine', sets: '3 × 15', A: mk(0.12), B: mk(0.46),
      phases: ['Set', 'Open', 'Hold', 'Close'],
      cues: ['Sit tall, back against the pad, the padded rods on the outside of the knees.', 'Push the knees apart with the glutes, not with momentum.', 'Hold one second at the widest point.', 'Bring the knees back slowly, do not let the stack slam.'],
      tempo: [0.8, 1.2, 0.8, 1.8], view: 'three',
      build: (G2, Dn) => {
        seatBack(G2, -0.25, 0.46, 0.12, 0.36, 0.7);
        const rods = [1, -1].map(() => cylY(Dn, 0.045, 0.32, 0, 0, 0, MT.pad));
        const lev = [1, -1].map(() => seg(Dn, 0.024, MT.red));
        const lev2 = [1, -1].map(() => seg(Dn, 0.024, MT.red));
        [1, -1].forEach(sx => { cylY(G2, 0.05, 0.3, sx * 0.30, 0.15, -0.30, MT.frame); });
        return () => { [['LeftLeg', 1], ['RightLeg', -1]].forEach(([n, sx], i) => { const k = bone(n); const p = V(k.x + sx * 0.115, k.y, k.z);
          rods[i].position.copy(p); const piv = V(sx * 0.30, 0.30, -0.30);
          lev[i].set(piv, V(p.x, p.y - 0.16, p.z - 0.04)); lev2[i].set(V(p.x, p.y - 0.16, p.z - 0.04), V(p.x, p.y + 0.16, p.z - 0.04)); }); };
      }
    });
  }

  // ---- rear kick machine ----
  {
    const H = [0.93, 0.05];
    const mk = r => stand({ H, p: 14, t: 22, feet: { L: [0.10, AY, 0.0], R: r }, pf: { L: 0, R: 20 }, out: 4,
      arms: pair([0.22, -0.30, 0.40], [0.28, -0.22, 0.12], [0, 0, 1], [-1, 0, 0]), curl: 0.9 });
    out.push({
      id: 'kickback', group: G, name: 'Rear kick (glute machine)', sets: '3 × 12 each leg', A: mk([-0.10, 0.46, 0.0]), B: mk([-0.10, 0.27, -0.50]),
      phases: ['Set', 'Kick', 'Squeeze', 'Return'],
      cues: ['Hold the handles, support leg slightly bent, pad against the heel.', 'Push the pad back and up with the glute, keep the ribs still.', 'Squeeze the glute at the top, do not arch the lower back.', 'Bring the knee back under the hip slowly.'],
      tempo: [0.8, 1.2, 0.8, 1.6], view: 'side', build: (G2, Dn) => {
        box(G2, 0.4, 0.05, 0.9, 0, 0.045, 0.0, MT.frame); box(G2, 0.08, 1.15, 0.08, 0.0, 0.6, 0.72, MT.frame);
        const h = mkHandle('bar', 0.5); Dn.add(h); const pad = box(Dn, 0.12, 0.12, 0.1, 0, 0, 0, MT.pad); const lev = seg(Dn, 0.015, MT.frame);
        return () => { const hh = FH(); if (hh.L) place(h, mid(hh.L.handle, hh.R.handle), V(1, 0, 0)); const a = bone('RightFoot'); pad.position.copy(a).add(V(0, 0.0, -0.1)); lev.set(V(-0.1, 0.1, 0.75), pad.position); };
      }
    });
  }

  // ---- jump squat ----
  {
    const A = stand({ H: sqHip(36, 80), p: 24, t: 30, feet: feet2([0.16, AY, 0]), out: 14, arms: pair([0.20, -0.36, -0.36], [0.22, -0.20, -0.18], [0, -1, -0.2], [-1, 0, 0]), curl: 0.3 });
    const Bj = stand({ H: [SY + 0.30, HZ0], p: 0, t: 0, feet: feet2([0.12, AY + 0.28, -0.04]), pf: { L: 55, R: 55 }, out: 8, arms: pair([0.20, 0.40, 0.20], [0.26, 0.15, 0.0], [0, 1, 0.2], [-1, 0, 0]), curl: 0.3 });
    out.push({
      id: 'jumpsquat', group: G, name: 'Jump squat', sets: 'HIIT 20 s on', A, B: Bj,
      phases: ['Load', 'Explode', 'Air', 'Land'],
      cues: ['Quarter squat, arms back, chest up.', 'Jump as high as you can, arms swing up.', 'Fully extended in the air.', 'Land softly on the balls of the feet and sink straight back into the next squat.'],
      tempo: [0.5, 0.35, 0.25, 0.6], view: 'side'
    });
  }

  // ---- hip thrust ----
  {
    const arm = (hy, hz) => pair([0.27, hy + 0.085, hz - 0.03], [0.35, hy - 0.05, hz - 0.30], [0, -0.2, 1], [0, -1, 0]);
    const mk = (H, t) => { const by = H[0] + 0.09, bz = H[1] + 0.07; return stand({ H, p: t * 0.92, t, nk: -88, hd: -88, feet: feet2([0.14, AY, 0.36]), kp: [0.2, 1, 0.4], out: 8, fr: 'w', retract: 10,
      arms: { L: { w: [0.27, by + 0.085, bz - 0.03], e: [0.36, by - 0.10, bz - 0.35], h: [0, -0.2, 1], n: [0, -1, 0] }, R: { w: [-0.27, by + 0.085, bz - 0.03], e: [-0.36, by - 0.10, bz - 0.35], h: [0, -0.2, 1], n: [0, -1, 0] } }, curl: 0.9, hr: 0.014 }); };
    out.push({
      id: 'hipthrust', group: G, name: 'Hip thrust', sets: '3 × 10', bar: true, A: mk([0.28, -0.06], -54), B: mk([0.60, 0.0], -90),
      phases: ['Set', 'Thrust', 'Top', 'Lower'],
      cues: ['Shoulder blades on the bench edge, feet hip-width, bar across the hip crease.', 'Drive through the heels and push the hips up.', 'Shins vertical, ribs down, squeeze the glutes.', 'Lower under control until the hips almost touch the floor.'],
      tempo: [0.8, 1.2, 0.8, 1.6], view: 'side',
      build: (G2, Dn) => { bench(G2, -1.12, -0.50, 0.44, 0.3); return barFromHands; }
    });
  }

  // ---- band glute bridge ----
  {
    const mk = (H, t) => stand({ H, p: t * 0.95, t, nk: -90, hd: -90, feet: feet2([0.14, AY, 0.55]), kp: [0.5, 1, 0.5], out: 14,
      arms: pair([0.28, -0.07, 0.45], [0.25, -0.07, 0.22], [0, 0, 1], [0, -1, 0]), curl: 0 });
    out.push({
      id: 'glutebridge', group: G, name: 'Glute bridge with band', sets: '3 × 12-15', A: mk([0.15, 0.0], -90), B: mk([0.46, -0.15], -138),
      phases: ['Set', 'Lift', 'Top', 'Lower'],
      cues: ['Lie on your back, band just above the knees, feet hip-width.', 'Push through the heels and lift the hips, knees push out against the band.', 'Squeeze the glutes, body in a straight line from shoulders to knees.', 'Lower slowly, keep the band tight.'],
      tempo: [0.8, 1.2, 0.8, 1.6], view: 'side',
      build: (G2, Dn) => {
        box(G2, 0.8, 0.012, 2.0, 0, 0.005, 0.0, MT.blk);
        const band = seg(Dn, 0.012, MT.band);
        return () => band.set(bone('LeftLeg').add(V(0.04, 0, 0)), bone('RightLeg').add(V(-0.04, 0, 0)));
      }
    });
  }
  return out;
}
