// ---------- pose builders ----------
let C = null;
function makeCtx() {
  const LEG = M.thigh + M.shin, HZ0 = M.Left.hip.z - M.Left.ank.z;
  const mir = a => ({ w: [-a.w[0], a.w[1], a.w[2]], e: [-a.e[0], a.e[1], a.e[2]], h: [-a.h[0], a.h[1], a.h[2]], n: [-a.n[0], a.n[1], a.n[2]] });
  const sym = Lh => ({ L: Lh, R: mir(Lh) });
  const hang = () => ({ w: [0.20, -0.54, 0.0], e: [0.22, -0.27, -0.06], h: [0, -1, 0], n: [-1, 0, 0] });
  const stand = (o = {}) => Object.assign({
    H: [AY + LEG - 0.012, HZ0], p: 0, t: 0,
    feet: { L: [0.12, AY, 0], R: [-0.12, AY, 0] }, out: 12, pf: { L: 0, R: 0 },
    arms: sym(hang()), fr: 's', curl: 0.2, retract: 0, depress: 0
  }, o);
  // ankle position from hip + absolute segment angles (deg from straight down, + = forward)
  const ankleFrom = (H, thighDeg, shinDeg, x) => {
    const a = D(thighDeg), b = D(shinDeg);
    return [x, H[0] - M.thigh * Math.cos(a) - M.shin * Math.cos(b), H[1] + M.thigh * Math.sin(a) + M.shin * Math.sin(b)];
  };
  const smithRails = (G2, Dn) => {
    cur.rails = [-1, 1].map(sx => { const g = new THREE.Group(); g.userData.sx = sx; box(g, 0.06, 2.3, 0.06, 0, 0, 0, MT.frame); box(g, 0.04, 2.3, 0.02, 0, 0, 0.04, MT.red); Dn.add(g); g.position.set(sx * 0.72, 1.15, 0); return g; });
    return () => {};
  };
  return { smithRails, V, D, M, AY, LEG, HZ0, mir, sym, hang, stand, ankleFrom, THREE, box, cylX, cylY, cylZ, bench, seatBack, stackTower, floorMat, seg, place, mkDumbbell, mkKettlebell, mkHandle, MT, mkMesh, bar, HANDS: () => HANDS, wp, B };
}

// ---------- registry + timeline ----------
let EXS = [], cur = null, curIdx = 0, upd = null;
const dynGroup = new THREE.Group(); scene.add(dynGroup);
const ease = u => u * u * (3 - 2 * u);
const easeUp = u => 1 - Math.pow(1 - u, 2.2);
let clock = 0, speed = 1, playing = true, lastPhase = -1;
const phaseEl = document.getElementById('phase'), cuesEl = document.getElementById('cues');
function phaseAt(tm, T) {
  const cyc = T[0] + T[1] + T[2] + T[3], x = tm % cyc;
  if (x < T[0]) return [0, 0];
  if (x < T[0] + T[1]) return [ease((x - T[0]) / T[1]), 1];
  if (x < T[0] + T[1] + T[2]) return [1, 2];
  return [1 - easeUp((x - T[0] - T[1] - T[2]) / T[3]), 3];
}
function resize() {
  const w = wrap.clientWidth, h = wrap.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
let userMoved = false;
if (window.ResizeObserver) new ResizeObserver(() => { resize(); if (!userMoved && cur && cur.ext) setView(cur.view || 'side'); }).observe(wrap);
const VIEWS = { side: V(3.6, 1.15, 0.3), front: V(0, 1.25, 3.8), three: V(2.6, 1.45, 2.7), back: V(-1.6, 1.6, -3.2) };
function frameEx() {
  const box = new THREE.Box3(), path = [];
  for (const s of [0, 0.25, 0.5, 0.75, 1]) {
    if (cur.apply) cur.apply(s); else applyPose(blend(cur.A, cur.B, cur.mid, s));
    for (const k in B) box.expandByPoint(wp(B[k]));
    if (cur.rails && cur.bar) { if (upd) upd(s); path.push(bar.position.clone()); }
  }
  if (cur.rails && path.length) {
    let lo = path[0], hi = path[0];
    for (const p of path) { if (p.y < lo.y) lo = p; if (p.y > hi.y) hi = p; }
    const zc = path.reduce((a, p) => a + p.z, 0) / path.length;
    for (const g of cur.rails) { g.position.set(g.userData.sx * 0.72, 1.15, zc); g.rotation.set(0, 0, 0); }
  }
  cur.ext = { c: box.getCenter(V()), size: box.getSize(V()) };
}
function setView(k) {
  const ext = cur.ext, asp = wrap.clientWidth / Math.max(1, wrap.clientHeight);
  const dirv = VIEWS[k].clone().sub(V(0, 0.9, 0)).normalize();
  const hz = k === 'side' ? ext.size.z + 0.35 : (k === 'front' || k === 'back') ? ext.size.x + 1.0 : Math.max(ext.size.x + 0.8, ext.size.z + 0.3);
  const d = THREE.MathUtils.clamp(Math.max((ext.size.y + 0.25) * 1.08 / 0.5735, hz * 1.08 / (0.5735 * asp)), 1.8, 7.5);
  const tgt = ext.c.clone();
  controls.target.copy(tgt); camera.position.copy(tgt).add(dirv.multiplyScalar(d)); controls.update();
  document.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', x.dataset.view === k));
  curView = k;
}
let curView = 'three';
function zoom(f) {
  const off = camera.position.clone().sub(controls.target);
  const len = THREE.MathUtils.clamp(off.length() * f, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(off.setLength(len)); controls.update();
}
function selectEx(i, keepView) {
  curIdx = (i + EXS.length) % EXS.length; cur = EXS[curIdx];
  while (propsGroup.children.length) propsGroup.remove(propsGroup.children[0]);
  while (dynGroup.children.length) dynGroup.remove(dynGroup.children[0]);
  propsGroup.position.set(0, 0, ZA);
  upd = cur.build ? cur.build(propsGroup, dynGroup) : null;
  bar.visible = !!cur.bar;
  document.getElementById('exsel').value = cur.id;
  document.getElementById('sets').textContent = cur.sets || '';
  document.getElementById('foot').textContent = cur.foot || ('Tempo ' + cur.tempo.join(' / ') + ' s.');
  cuesEl.innerHTML = cur.cues.map((c, i) => '<li data-i="' + i + '"><b>' + (i + 1) + '</b><span><strong>' + cur.phases[i] + '.</strong> ' + c + '</span></li>').join('');
  clock = 0; lastPhase = -1;
  frameEx();
  setView(keepView ? curView : (cur.view || 'side'));
}
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
document.querySelectorAll('[data-speed]').forEach(b => b.addEventListener('click', () => {
  speed = +b.dataset.speed;
  document.querySelectorAll('[data-speed]').forEach(x => x.setAttribute('aria-pressed', x === b));
}));
document.getElementById('zin').addEventListener('click', () => zoom(0.8));
document.getElementById('zout').addEventListener('click', () => zoom(1.25));
document.getElementById('prev').addEventListener('click', () => selectEx(curIdx - 1, true));
document.getElementById('next').addEventListener('click', () => selectEx(curIdx + 1, true));
const playBtn = document.getElementById('play');
playBtn.addEventListener('click', () => { playing = !playing; playBtn.textContent = playing ? 'Pause' : 'Play'; });

new GLTFLoader().parse(glb.buffer.slice(glb.byteOffset, glb.byteOffset + glb.byteLength), '', g => {
  const root = g.scene;
  let body;
  root.traverse(o => {
    if (o.isBone) B[o.name.replace('mixamorig', '')] = o;
    if (o.isMesh) {
      o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false;
      if (o.isSkinnedMesh && o.material.name !== 'Beta_Joints_MAT') body = o;
    }
  });
  scene.add(root);
  root.position.y = PLAT_TOP;
  root.updateMatrixWorld(true);
  for (const k in B) REST[B[k].name] = { q: B[k].getWorldQuaternion(new THREE.Quaternion()) };
  measure();
  SEAT = barSeat(body);
  ZA = M.Left.ank.z; AY = M.Left.ank.y;
  C = makeCtx();
  EXS = [].concat(defineA(C, { squat, TUN, setSmith: v => { SMITH = v; }, getSeat: () => SEAT, setGrip: v => { GRIP = v; } }), defineB(C), defineC(C));
  const sel = document.getElementById('exsel');
  let og = null, gname = '';
  for (const e of EXS) {
    if (e.group !== gname) { gname = e.group; og = document.createElement('optgroup'); og.label = gname; sel.appendChild(og); }
    const o = document.createElement('option'); o.value = e.id; o.textContent = e.name; og.appendChild(o);
  }
  sel.addEventListener('change', () => selectEx(EXS.findIndex(e => e.id === sel.value)));
  const start = (location.hash || '').slice(1);
  selectEx(Math.max(0, EXS.findIndex(e => e.id === start)));
  resize(); setView(cur.view || 'side'); controls.addEventListener('start', () => { userMoved = true; });
  document.getElementById('loading').remove();
  let last = performance.now();
  renderer.setAnimationLoop(now => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (playing) clock += dt * speed;
    const [s, ph] = phaseAt(clock, cur.tempo);
    if (ph !== lastPhase) {
      lastPhase = ph; phaseEl.textContent = cur.phases[ph];
      cuesEl.querySelectorAll('li').forEach((li, i) => li.classList.toggle('on', i === ph));
    }
    if (cur.apply) cur.apply(s); else applyPose(blend(cur.A, cur.B, cur.mid, s));
    if (upd) upd(s);
    const sideOn = Math.abs(camera.position.x - controls.target.x) / camera.position.distanceTo(controls.target);
    const op = sideOn > 0.9 ? 0.2 : 1;
    plateMat.opacity = rubber.opacity = op; plateMat.depthWrite = rubber.depthWrite = op === 1;
    controls.update();
    renderer.render(scene, camera);
  });
  window.__setView = setView; window.__setClock = c => { clock = c; playing = false; }; window.__zoom = zoom; window.__ctl = controls; window.__cam = camera;
  window.__sel = id => selectEx(EXS.findIndex(e => e.id === id)); window.__ids = () => EXS.map(e => e.id);
  window.__d = { applyAt: s => { if (cur.apply) cur.apply(s); else applyPose(blend(cur.A, cur.B, cur.mid, s)); if (upd) upd(s); }, groups: [propsGroup, dynGroup, bar], B, M, bar, wp, V, THREE, REST, TUN, get HANDS() { return HANDS; }, get cur() { return cur; } };
}, e => { document.getElementById('loading').textContent = 'Could not load the model: ' + e.message; });
