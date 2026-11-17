export default function shared(C) {
  const { V, D, M, AY, LEG, HZ0, sym, stand, ankleFrom, box, cylX, cylY, cylZ, mkDumbbell, mkKettlebell, mkHandle, MT, bar, HANDS, seg, place, mkMesh, THREE, wp, B, bench, seatBack, stackTower, floorMat } = C;
  const FH = () => HANDS();
  const hips = (z = 0) => V(0, 0, z);
  const barFromHands = () => {
    const h = FH(); if (!h.L || !h.R) return;
    bar.position.copy(h.L.handle).add(h.R.handle).multiplyScalar(0.5);
    bar.quaternion.setFromUnitVectors(V(1, 0, 0), h.L.handle.clone().sub(h.R.handle).normalize());
  };
  const dbs = Dn => {
    const a = mkDumbbell(), b = mkDumbbell(); Dn.add(a, b);
    return () => { const h = FH(); if (!h.L) return; place(a, h.L.handle, h.L.across); place(b, h.R.handle, h.R.across); };
  };
  const kbHeld = (Dn, hang = true) => {
    const k = mkKettlebell(); Dn.add(k);
    return () => {
      const h = FH(); if (!h.L) return;
      const c = h.L.handle.clone().add(h.R.handle).multiplyScalar(0.5);
      k.position.copy(c);
      const sh = wp(B.LeftArm).add(wp(B.RightArm)).multiplyScalar(0.5);
      const dir = hang ? V(0, -1, 0) : c.clone().sub(sh).normalize();
      k.quaternion.setFromUnitVectors(V(0, -1, 0), dir);
    };
  };
  const cable = (Dn, pulley, mat = MT.rope, r = 0.006) => {
    const l = seg(Dn, r, mat); const p = mkMesh(new THREE.SphereGeometry(0.035, 12, 10), MT.frame, pulley.x, pulley.y, pulley.z); Dn.add(p);
    return pt => l.set(pulley, pt);
  };
  const mid = (a, b) => a.clone().add(b).multiplyScalar(0.5);
  const sqHip = (shinDeg, thighDeg) => {
    const sa = D(shinDeg), ta = D(thighDeg);
    return [AY + M.shin * Math.cos(sa) + M.thigh * Math.cos(ta) - 0.012, M.shin * Math.sin(sa) - M.thigh * Math.sin(ta)];
  };
  const bone = n => wp(B[n]);
  const pair = (w, e, h, n) => sym({ w, e, h, n });
  return { ...C, FH, barFromHands, dbs, kbHeld, cable, mid, sqHip, bone, pair, hips };
}
