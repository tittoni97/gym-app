// ---------- rig helpers ----------
const B = {}, REST = {};
const qA = new THREE.Quaternion(), qB = new THREE.Quaternion();
const wp = b => b.getWorldPosition(V());
function basisQ(p, s) {
  const x = p.clone().normalize();
  const z = x.clone().cross(s).normalize();
  const y = z.clone().cross(x);
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
}
function setWorldQ(bone, q) {
  bone.parent.getWorldQuaternion(qA).invert();
  bone.quaternion.copy(qA.multiply(q));
  bone.updateMatrixWorld(true);
}
// orient a bone so its rest (primary, secondary) axes map onto target (primary, secondary)
function orient(bone, restP, restS, tgtP, tgtS) {
  const q = basisQ(tgtP, tgtS).multiply(basisQ(restP, restS).invert()).multiply(REST[bone.name].q);
  setWorldQ(bone, q);
}
// rotate a bone (world frame) by R relative to its rest orientation
function rotRest(bone, R) { setWorldQ(bone, R.clone().multiply(REST[bone.name].q)); }
const rx = a => new THREE.Quaternion().setFromAxisAngle(V(1, 0, 0), a);

