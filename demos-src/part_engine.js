// ---------- legs (with optional knee pole and foot pitch) ----------
function legIK(side, ankleW, toeOut, kp, pf, fup, fabs) {
  const sg = side === 'Left' ? 1 : -1, R = M[side];
  const hip = wp(B[side + 'UpLeg']);
  const pole = kp || V(sg * Math.sin(toeOut), 0, Math.cos(toeOut));
  const { J: K, E: A, n, u } = twoBone(hip, ankleW, M.thigh, M.shin, pole);
  const hinge = n.clone().cross(u).normalize();
  const restHinge = V(1, 0, 0);
  orient(B[side + 'UpLeg'], R.knee.clone().sub(R.hip), restHinge, K.clone().sub(hip), hinge);
  orient(B[side + 'Leg'], R.ank.clone().sub(R.knee), restHinge, A.clone().sub(K), hinge);
  const fr = R.toe.clone().sub(R.ank), len = fr.length(), horiz = Math.hypot(fr.x, fr.z);
  const pitch = fabs != null ? fabs : Math.atan2(-fr.y, horiz) + (pf || 0);
  const fd = V(sg * Math.sin(toeOut), 0, Math.cos(toeOut));
  const dir = fd.multiplyScalar(Math.cos(pitch)).add(V(0, -Math.sin(pitch), 0)).multiplyScalar(len);
  orient(B[side + 'Foot'], fr, V(0, 1, 0), dir, fup || V(0, 1, 0));
  rotRest(B[side + 'ToeBase'], new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), sg * toeOut));
}

// ---------- fingers: curl about the hand's across axis, sign chosen so the tip lands on the handle ----------
const fingerNames = ['Index', 'Middle', 'Ring', 'Pinky'];
function gripHand(sd, handle, axisDir, amount) {
  const R = M[sd];
  const fdir = R.mid.clone().sub(R.wri).normalize();
  const across = R.idx.clone().sub(R.pky).normalize();
  let palmN = fdir.clone().cross(across).normalize();
  if (palmN.dot(R.thb.clone().sub(R.wri)) * PALM_SIGN < 0) palmN.negate();
  const axis0 = fdir.clone().cross(palmN).normalize();
  const hand = B[sd + 'Hand'];
  const dq = hand.getWorldQuaternion(new THREE.Quaternion()).multiply(REST[hand.name].q.clone().invert());
  const dist = v => { const d = v.clone().sub(handle); d.sub(axisDir.clone().multiplyScalar(d.dot(axisDir))); return d.length(); };
  const chains = fingerNames.map(f => [f, [0.95, 1.1, 0.9]]).concat([['Thumb', [0.35, 0.5, 0.5]]]);
  for (const [f, wts] of chains) {
    const apply = am => {
      let cum = 0;
      wts.forEach((w, i) => {
        const b = B[sd + 'Hand' + f + (i + 1)]; if (!b) return;
        cum += am * w;
        setWorldQ(b, dq.clone().multiply(new THREE.Quaternion().setFromAxisAngle(axis0, cum)).multiply(REST[b.name].q));
      });
      return dist(wp(B[sd + 'Hand' + f + 3]));
    };
    if (amount <= 0.001) { apply(0); continue; }
    const dp = apply(amount), dm = apply(-amount);
    apply(dp <= dm ? amount : -amount);
  }
}
function grip(barW, side) {
  for (const sd of ['Left', 'Right']) {
    const sg = sd === 'Left' ? 1 : -1;
    gripHand(sd, barW.clone().add(side.clone().multiplyScalar(sg * GRIP)), side, TUN.curl);
  }
}

// ---------- props ----------
const propsGroup = new THREE.Group(); scene.add(propsGroup);
const MT = {
  pad: new THREE.MeshStandardMaterial({ color: 0x3b4452, roughness: 0.85 }),
  padL: new THREE.MeshStandardMaterial({ color: 0x59636f, roughness: 0.85 }),
  frame: new THREE.MeshStandardMaterial({ color: 0x8e979f, metalness: 0.7, roughness: 0.4 }),
  blk: new THREE.MeshStandardMaterial({ color: 0x23272c, roughness: 0.7 }),
  red: new THREE.MeshStandardMaterial({ color: 0xc8233a, roughness: 0.5 }),
  stack: new THREE.MeshStandardMaterial({ color: 0x6d7886, roughness: 0.6 }),
  band: new THREE.MeshStandardMaterial({ color: 0x22a06b, roughness: 0.6 }),
  rope: new THREE.MeshStandardMaterial({ color: 0xe9ecef, roughness: 0.9 }),
  kb: new THREE.MeshStandardMaterial({ color: 0x1d2024, roughness: 0.55, metalness: 0.2 })
};
const mkMesh = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; };
const box = (g, w, h, d, x, y, z, m = MT.pad, rotX = 0) => { const b = mkMesh(new THREE.BoxGeometry(w, h, d), m, x, y, z); b.rotation.x = rotX; g.add(b); return b; };
const cylY = (g, r, h, x, y, z, m = MT.frame) => { const c = mkMesh(new THREE.CylinderGeometry(r, r, h, 16), m, x, y, z); g.add(c); return c; };
const cylX = (g, r, len, x, y, z, m = MT.frame) => { const c = mkMesh(new THREE.CylinderGeometry(r, r, len, 16), m, x, y, z); c.rotation.z = Math.PI / 2; g.add(c); return c; };
const cylZ = (g, r, len, x, y, z, m = MT.frame) => { const c = mkMesh(new THREE.CylinderGeometry(r, r, len, 16), m, x, y, z); c.rotation.x = Math.PI / 2; g.add(c); return c; };
// a thin rod between two world points; returns updater
function seg(g, r, m) {
  const c = mkMesh(new THREE.CylinderGeometry(r, r, 1, 10), m); c.castShadow = false; g.add(c);
  const up = V(0, 1, 0);
  c.set = (a, b) => { const d = b.clone().sub(a), L = d.length(); c.position.copy(a).add(b).multiplyScalar(0.5); c.scale.set(1, Math.max(L, 1e-4), 1); c.quaternion.setFromUnitVectors(up, d.normalize()); };
  return c;
}
const X = V(1, 0, 0);
function place(o, pos, axis) { o.position.copy(pos); if (axis) o.quaternion.setFromUnitVectors(X, axis.clone().normalize()); }
function mkDumbbell(kg = 1) {
  const g = new THREE.Group(), r = 0.045 + kg * 0.0;
  cylX(g, 0.014, 0.14, 0, 0, 0, MT.frame);
  for (const sx of [-1, 1]) { cylX(g, 0.05, 0.05, sx * 0.075, 0, 0, MT.blk); cylX(g, 0.04, 0.03, sx * 0.105, 0, 0, MT.blk); }
  return g;
}
function mkKettlebell() {
  const g = new THREE.Group();
  const body = mkMesh(new THREE.SphereGeometry(0.095, 24, 18), MT.kb, 0, -0.14, 0); g.add(body);
  const h = mkMesh(new THREE.TorusGeometry(0.06, 0.013, 10, 24, Math.PI * 1.15), MT.kb, 0, -0.03, 0); h.rotation.z = Math.PI * 0.425; g.add(h);
  return g;
}
function mkHandle(kind = 'bar', len = 0.5) {   // x-axis is the handle axis
  const g = new THREE.Group();
  if (kind === 'bar') { cylX(g, 0.014, len, 0, 0, 0, MT.frame); }
  else if (kind === 'ez') { cylX(g, 0.014, len, 0, 0, 0, MT.frame); }
  else if (kind === 'v') { cylX(g, 0.012, 0.12, 0, 0, 0, MT.frame); }
  else if (kind === 'rope') { cylX(g, 0.012, 0.3, 0, 0, 0, MT.rope); }
  return g;
}
// bench: pad top at world height `top`, spanning z in [z0,z1] (ankle-relative; propsGroup carries the offset)
function bench(g, z0, z1, top = 0.47, w = 0.30, tilt = 0) {
  const len = z1 - z0, zc = (z0 + z1) / 2;
  const pad = box(g, w, 0.07, len, 0, top - 0.035, zc, MT.pad);
  if (tilt) { pad.rotation.x = tilt; }
  box(g, 0.06, top - 0.07, 0.06, 0, (top - 0.07) / 2, z0 + 0.12, MT.frame);
  box(g, 0.06, top - 0.07, 0.06, 0, (top - 0.07) / 2, z1 - 0.12, MT.frame);
  box(g, 0.5, 0.03, 0.06, 0, 0.03 + 0.02, z0 + 0.12, MT.frame);
  box(g, 0.5, 0.03, 0.06, 0, 0.05, z1 - 0.12, MT.frame);
  return pad;
}
// seat + backrest at angle (rad from vertical, positive = leaning back); seat top height h, seat centre z
function seatBack(g, zSeat, h = 0.46, back = 0.15, width = 0.34, backLen = 0.62) {
  box(g, width, 0.08, 0.42, 0, h - 0.04, zSeat, MT.pad);
  const b = box(g, width, backLen, 0.07, 0, 0, 0, MT.pad);
  const cx = zSeat - 0.21 - 0.02, cy = h + 0.02;
  b.position.set(0, cy + Math.cos(back) * backLen / 2, cx - Math.sin(back) * backLen / 2);
  b.rotation.x = -back;   // leans back (toward -z)
  cylY(g, 0.04, h - 0.08, 0, (h - 0.08) / 2, zSeat - 0.05, MT.frame);
  box(g, 0.5, 0.05, 0.9, 0, 0.025, zSeat - 0.1, MT.frame);
}
function stackTower(g, z, side = 0, h = 1.9) {
  box(g, 0.45, h, 0.3, side, h / 2, z, MT.stack);
  box(g, 0.40, 0.45, 0.26, side, h * 0.55, z + 0.0, MT.red);
}
function floorMat(g, z, w = 0.8, l = 1.8) { box(g, w, 0.01, l, 0, 0.005, z, MT.blk); }

// ---------- pose blending (quadratic Bezier through an optional mid pose) ----------
function blend(a, b, m, s) {
  if (typeof a === 'number') {
    if (m === undefined) return a + (b - a) * s;
    const c = 2 * m - 0.5 * (a + b), u = 1 - s;
    return u * u * a + 2 * u * s * c + s * s * b;
  }
  if (Array.isArray(a)) return a.map((x, i) => blend(x, b[i], m ? m[i] : undefined, s));
  if (a && typeof a === 'object') { const o = {}; for (const k in a) o[k] = blend(a[k], b[k] === undefined ? a[k] : b[k], m && m[k] !== undefined ? m[k] : undefined, s); return o; }
  return a;
}
let ZA = 0, AY = 0;
let HANDS = {};
function applyPose(P) {
  const hf = ZA;
  const p = D(P.p || 0), t = D(P.t || 0);
  const nkw = D(P.nk !== undefined ? P.nk : (P.t >= 0 ? P.t * 0.62 : P.t)), hdw = D(P.hd !== undefined ? P.hd : (P.t >= 0 ? P.t * 0.38 : P.t));
  const H = V(0, P.H[0], P.H[1] + hf);
  const off = M.hipOff.clone().applyQuaternion(rx(p));
  B.Hips.position.copy(B.Hips.parent.worldToLocal(H.clone().sub(off)));
  rotRest(B.Hips, rx(p));
  const per = (t - p) / 3;
  rotRest(B.Spine, rx(p + per)); rotRest(B.Spine1, rx(p + 2 * per)); rotRest(B.Spine2, rx(t));
  rotRest(B.Neck, rx(nkw)); rotRest(B.Head, rx(hdw));
  const out = D(P.out !== undefined ? P.out : 12);
  for (const sd of ['Left', 'Right']) {
    const sg = sd === 'Left' ? 1 : -1, f = P.feet[sd[0]];
    const kp = P.kp ? V(sg * P.kp[0], P.kp[1], P.kp[2]) : null;
    legIK(sd, V(f[0], f[1], f[2] + hf), out, kp, D(P.pf ? P.pf[sd[0]] : 0), P.fup ? V(P.fup[0], P.fup[1], P.fup[2]) : null, P.fabs != null ? D(P.fabs) : null);
  }
  const tq = B.Spine2.getWorldQuaternion(new THREE.Quaternion()).multiply(REST[B.Spine2.name].q.clone().invert());
  const up = V(0, 1, 0).applyQuaternion(tq), fw = V(0, 0, 1).applyQuaternion(tq), side = V(1, 0, 0).applyQuaternion(tq);
  for (const sd of ['Left', 'Right']) {
    const sg = sd === 'Left' ? 1 : -1, cl = B[sd + 'Shoulder'];
    const qa = new THREE.Quaternion().setFromAxisAngle(up, sg * D(P.retract || 0));
    const qb = new THREE.Quaternion().setFromAxisAngle(fw, sg * D(P.depress || 0));
    setWorldQ(cl, qb.multiply(qa).multiply(tq).multiply(REST[cl.name].q));
  }
  const O = wp(B.LeftArm).add(wp(B.RightArm)).multiplyScalar(0.5);
  const fr = P.fr || 's';
  const toW = (v, dir) => {
    if (fr === 't') { const a = side.clone().multiplyScalar(v[0]).add(up.clone().multiplyScalar(v[1])).add(fw.clone().multiplyScalar(v[2])); return dir ? a : a.add(O); }
    if (dir) return V(v[0], v[1], v[2]);
    return fr === 'w' ? V(v[0], v[1], v[2] + hf) : V(v[0], v[1], v[2]).add(O);
  };
  HANDS = {};
  for (const sd of ['Left', 'Right']) {
    const a = P.arms[sd[0]];
    const S = wp(B[sd + 'Arm']);
    const Wt = toW(a.w), Eh = toW(a.e);
    armIK(sd, Wt, Eh.clone().sub(S), 0, null);
    const hv = toW(a.h, true).normalize(), nv0 = toW(a.n, true);
    handOrient(sd, hv, nv0);
    const nv = nv0.clone().sub(hv.clone().multiplyScalar(nv0.dot(hv))).normalize();
    const Pn = n => wp(B[sd + n]);
    const mcp = Pn('HandIndex1').add(Pn('HandMiddle1')).add(Pn('HandRing1')).add(Pn('HandPinky1')).multiplyScalar(0.25);
    const C = Pn('Hand').add(mcp).multiplyScalar(0.5);
    const across = Pn('HandIndex1').sub(Pn('HandPinky1')).normalize();
    const handle = C.clone().add(nv.clone().multiplyScalar(0.03 + (P.hr || 0.014)));
    HANDS[sd[0]] = { C, N: nv, across, handle, hv };
    gripHand(sd, handle, across, P.curl !== undefined ? P.curl : 0.95);
  }
}
