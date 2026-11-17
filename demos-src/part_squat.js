// ---------- barbell back squat ----------
let SEAT; let SEAT_DY = -0.03;
const STANCE = 0.18, TOE_OUT = D(25);
const TUN = { retract: 25, depress: -10, shin: 42, thigh: 96, tiltMax: 50, elbow: [0.34, -0.20, 0.0], hand: [0.9, 0.0, 0.0], palmGap: 0.030, curl: 0.95, spread: 0.0 };
let GRIP = 0.27, Z0 = null, SMITH = false;
function squat(s) {
  const ank = M.Left.ank;
  // hip joint path: straight down, steadily back (no overshoot), knees found by leg IK
  const sa = D(TUN.shin), ta = D(TUN.thigh);
  const hy0 = ank.y + M.shin + M.thigh - 0.012, hz0 = ank.z;
  const hyB = ank.y + M.shin * Math.cos(sa) + M.thigh * Math.cos(ta) - 0.012;
  const hzB = ank.z + M.shin * Math.sin(sa) - M.thigh * Math.sin(ta);
  const H = V(0, hy0 + (hyB - hy0) * s, hz0 + (hzB - hz0) * s);
  const midZ = ank.z + M.footLen * 0.38;
  let t = 0, p = 0, hipsW = V();
  const place = () => {
    const off = M.hipOff.clone().applyQuaternion(rx(p));
    hipsW = H.clone().sub(off);
    B.Hips.position.copy(B.Hips.parent.worldToLocal(hipsW.clone()));
    rotRest(B.Hips, rx(p));
    const per = (t - p) / 3;
    rotRest(B.Spine, rx(p + per)); rotRest(B.Spine1, rx(p + 2 * per)); rotRest(B.Spine2, rx(t));
    rotRest(B.Neck, rx(t * 0.62)); rotRest(B.Head, rx(t * 0.38));
  };
  if (Z0 === null) { t = 0; p = 0; place(); Z0 = B.Spine2.localToWorld(SEAT.clone()).z; }
  const zt = SMITH ? Z0 : Z0 + (midZ - Z0) * Math.pow(s, 0.9);   // bar drifts from its standing position to over mid-foot
  for (let it = 0; it < 6; it++) {
    p = t * 0.82; place();
    const bw = B.Spine2.localToWorld(SEAT.clone());
    const R = bw.distanceTo(hipsW);
    t = THREE.MathUtils.clamp(t + Math.asin(THREE.MathUtils.clamp((zt - bw.z) / R, -0.4, 0.4)), 0, D(TUN.tiltMax));
  }
  p = t * 0.82; place();
  for (const side of ['Left', 'Right']) {
    const sg = side === 'Left' ? 1 : -1;
    legIK(side, V(sg * STANCE, ank.y, ank.z), TOE_OUT);
  }
  // bar on the back
  const barW = B.Spine2.localToWorld(SEAT.clone());
  bar.position.copy(barW);
  const tq = B.Spine2.getWorldQuaternion(new THREE.Quaternion()).multiply(REST[B.Spine2.name].q.clone().invert());
  const up = V(0, 1, 0).applyQuaternion(tq), fw = V(0, 0, 1).applyQuaternion(tq), side = V(1, 0, 0).applyQuaternion(tq);
  // scapular retraction + depression (what lifters do to build the shelf under the bar)
  for (const sd of ['Left', 'Right']) {
    const sg = sd === 'Left' ? 1 : -1, cl = B[sd + 'Shoulder'];
    const qa = new THREE.Quaternion().setFromAxisAngle(up, sg * D(TUN.retract));
    const qb = new THREE.Quaternion().setFromAxisAngle(fw, sg * D(TUN.depress));
    setWorldQ(cl, qb.multiply(qa).multiply(tq).multiply(REST[cl.name].q));
  }
  for (const sd of ['Left', 'Right']) {
    const sg = sd === 'Left' ? 1 : -1;
    const Ed = barW.clone().add(side.clone().multiplyScalar(sg * TUN.elbow[0])).add(up.clone().multiplyScalar(TUN.elbow[1])).add(fw.clone().multiplyScalar(TUN.elbow[2]));
    const pole = Ed.clone().sub(wp(B[sd + 'Arm']));
    // palm centre must land on the back face of the bar: iterate the wrist target
    const Q = barW.clone().add(side.clone().multiplyScalar(sg * GRIP)).add(fw.clone().multiplyScalar(-(0.014 + TUN.palmGap)));
    const wrist = Q.clone().add(up.clone().multiplyScalar(-0.07));
    for (let k = 0; k < 4; k++) {
      armIK(sd, wrist, pole, 0, null);
      handOrient(sd, up.clone().multiplyScalar(TUN.hand[0]).add(fw.clone().multiplyScalar(TUN.hand[1])).add(side.clone().multiplyScalar(-sg * TUN.hand[2])), fw);
      const P = n => wp(B[sd + n]);
      const mcp = P('HandIndex1').add(P('HandMiddle1')).add(P('HandRing1')).add(P('HandPinky1')).multiplyScalar(0.25);
      const palm = P('Hand').add(mcp).multiplyScalar(0.5);
      wrist.add(Q.clone().sub(palm));
    }
    armIK(sd, wrist, pole, 0, null);
    handOrient(sd, up.clone().multiplyScalar(TUN.hand[0]).add(fw.clone().multiplyScalar(TUN.hand[1])).add(side.clone().multiplyScalar(-sg * TUN.hand[2])), fw);
  }
  grip(barW, side);
}
