// ---------- IK ----------
function twoBone(S, T, l1, l2, poleDir) {
  const d0 = T.clone().sub(S), d = THREE.MathUtils.clamp(d0.length(), 0.05, l1 + l2 - 0.002), u = d0.normalize();
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(l1 * l1 - a * a, 0));
  const n = poleDir.clone().sub(u.clone().multiplyScalar(poleDir.dot(u))).normalize();
  const J = S.clone().add(u.clone().multiplyScalar(a)).add(n.clone().multiplyScalar(h));
  return { J, E: S.clone().add(u.clone().multiplyScalar(d)), n, u };
}
const FWD = V(0, 0, 1);
function armIK(side, target, poleW, handPitch, palmTo) {
  const R = M[side];
  const S = wp(B[side + 'Arm']);
  const { J: E, E: H, n, u } = twoBone(S, target, M.ua, M.fa, poleW);
  const hinge = n.clone().cross(u).normalize();
  const restU = R.wri.clone().sub(R.sho).normalize();
  const restHinge = FWD.clone().negate().cross(restU).normalize();
  orient(B[side + 'Arm'], R.elb.clone().sub(R.sho), restHinge, E.clone().sub(S), hinge);
  orient(B[side + 'ForeArm'], R.wri.clone().sub(R.elb), restHinge, H.clone().sub(E), hinge);
  const fdir = H.clone().sub(E).normalize();
  const hdir = fdir.clone().applyAxisAngle(hinge, handPitch);
  orient(B[side + 'Hand'], R.mid.clone().sub(R.wri), restHinge, hdir, hinge);
  if (palmTo) {
    // roll forearm + hand about the forearm axis so the palm faces palmTo (pronation)
    const P = n => wp(B[side + n]);
    const hd = P('HandMiddle1').sub(P('Hand')).normalize();
    let pn = hd.clone().cross(P('HandIndex1').sub(P('HandPinky1')).normalize()).normalize();
    if (pn.dot(P("HandThumb2").sub(P("Hand"))) * PALM_SIGN < 0) pn.negate();
    const ax = fdir;
    const a = pn.clone().sub(ax.clone().multiplyScalar(pn.dot(ax))).normalize();
    const b = palmTo.clone().sub(ax.clone().multiplyScalar(palmTo.dot(ax))).normalize();
    const ang = Math.atan2(a.clone().cross(b).dot(ax), a.dot(b));
    const fq = B[side + 'ForeArm'].getWorldQuaternion(new THREE.Quaternion());
    setWorldQ(B[side + 'ForeArm'], new THREE.Quaternion().setFromAxisAngle(ax, ang * 0.65).multiply(fq));
    const hq = B[side + 'Hand'].getWorldQuaternion(new THREE.Quaternion());
    setWorldQ(B[side + 'Hand'], new THREE.Quaternion().setFromAxisAngle(ax, ang * 0.35).multiply(hq));
    // wrist extension so the palm sits flat on the back of the bar
    const P2 = n => wp(B[side + n]);
    const kn = P2('HandIndex1').sub(P2('HandPinky1')).normalize();
    const hq2 = B[side + 'Hand'].getWorldQuaternion(new THREE.Quaternion());
    const hd2 = P2('HandMiddle1').sub(P2('Hand')).normalize();
    const test = hd2.clone().applyAxisAngle(kn, 0.1);
    const sgn = test.dot(palmTo) > hd2.dot(palmTo) ? -1 : 1;   // tilt fingers back, away from the palm side
    setWorldQ(B[side + 'Hand'], new THREE.Quaternion().setFromAxisAngle(kn, sgn * wristExt).multiply(hq2));
  }
}

// orient the hand explicitly: finger direction h, palm normal N (world)
function handOrient(side, h, N) {
  const R = M[side];
  const fd = R.mid.clone().sub(R.wri).normalize();
  const across = R.idx.clone().sub(R.pky).normalize();
  let pn = fd.clone().cross(across).normalize();
  if (pn.dot(R.thb.clone().sub(R.wri)) * PALM_SIGN < 0) pn.negate();
  const hh = h.clone().normalize();
  const NN = N.clone().sub(hh.clone().multiplyScalar(N.dot(hh))).normalize();
  orient(B[side + 'Hand'], fd, pn, hh, NN);
}
let wristExt = 0.35; let PALM_SIGN = 1;
