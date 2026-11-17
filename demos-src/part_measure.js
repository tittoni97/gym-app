// ---------- model + measurements ----------
let M = {};
function measure() {
  const P = n => wp(B[n]);
  M.hips = P('Hips');
  for (const s of ['Left', 'Right']) {
    M[s] = {
      hip: P(s + 'UpLeg'), knee: P(s + 'Leg'), ank: P(s + 'Foot'), toe: P(s + 'ToeBase'),
      sho: P(s + 'Arm'), elb: P(s + 'ForeArm'), wri: P(s + 'Hand'), mid: P(s + 'HandMiddle1'),
      idx: P(s + 'HandIndex1'), pky: P(s + 'HandPinky1'), thb: P(s + 'HandThumb2')
    };
  }
  const L = M.Left;
  M.thigh = L.hip.distanceTo(L.knee); M.shin = L.knee.distanceTo(L.ank);
  M.ua = L.sho.distanceTo(L.elb); M.fa = L.elb.distanceTo(L.wri);
  M.hipOff = L.hip.clone().sub(M.hips); M.hipOff.x = 0;
  M.footLen = L.ank.distanceTo(L.toe) * 1.45;
  M.neckY = P('Neck').y - 0.015; M.waistY = M.hips.y + 0.055;
  M.armL = M.Left.sho; M.armR = M.Right.sho;
  M.armDL = M.Left.elb.clone().sub(M.Left.sho).normalize(); M.armDR = M.Right.elb.clone().sub(M.Right.sho).normalize();
  M.legL = M.Left.hip; M.legR = M.Right.hip;
  M.legDL = M.Left.knee.clone().sub(M.Left.hip).normalize(); M.legDR = M.Right.knee.clone().sub(M.Right.hip).normalize();
  M.sleeve = M.ua * 0.42; M.shorts = M.thigh * 0.5;
}

// bar seat: posterior skin surface of the upper back, on top of the shoulder-blade muscles (low-bar shelf)
function barSeat(mesh) {
  const pos = mesh.geometry.attributes.position, m = mesh.matrixWorld, v = V();
  const y0 = wp(B.LeftArm).y - 0.025 + SEAT_DY;   // rear-delt / mid-trap shelf
  let back = Infinity;
  for (let i = 0; i < pos.count; i++) {
    if (mesh.getVertexPosition) mesh.getVertexPosition(i, v); else v.fromBufferAttribute(pos, i);
    v.applyMatrix4(m);
    if (Math.abs(v.x) < 0.16 && Math.abs(v.y - y0) < 0.02 && v.z < back) back = v.z;
  }
  const seatW = V(0, y0, back - 0.014 + 0.003);   // bar centre: skin surface minus bar radius, slight soft-tissue sink
  return B.Spine2.worldToLocal(seatW.clone());
}

