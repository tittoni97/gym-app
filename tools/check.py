import asyncio, sys, json
from playwright.async_api import async_playwright
JS = r"""
(ids)=>{
const d=window.__d, T=d.THREE, B=d.B, V=(x,y,z)=>new T.Vector3(x,y,z);
const P=n=>d.wp(B[n]);
const res={};
for(const id of ids){
  window.__sel(id); const cur=d.cur; const rep={self:{},prop:{},elbow:{}}; 
  // collect prop meshes
  const meshes=[]; for(const g of d.groups){ g.updateMatrixWorld(true); g.traverse(o=>{ if(o.isMesh && o.geometry && (o.geometry.type==='BoxGeometry'||o.geometry.type==='CylinderGeometry')) meshes.push(o); }); }
  let prevN={L:null,R:null}, prevE={L:null,R:null};
  const N=60;
  for(let i=0;i<=N;i++){
    const s=i/N;
    window.__setClock(0); 
    // drive pose exactly like animation: use cur.apply or blend via exposed apply
    d.applyAt(s);
    for(const g of d.groups) g.updateMatrixWorld(true);
    const hips=P('Hips'), neck=P('Neck'), up=neck.clone().sub(hips).normalize();
    const lat=P('LeftArm').sub(P('RightArm')); lat.sub(up.clone().multiplyScalar(lat.dot(up))).normalize();
    const fw=lat.clone().cross(up).normalize(); // forward (check sign below)
    const chest=P('Spine1');
    const segs={ LUA:['LeftArm','LeftForeArm',0.045], LFA:['LeftForeArm','LeftHand',0.04], RUA:['RightArm','RightForeArm',0.045], RFA:['RightForeArm','RightHand',0.04],
      LTH:['LeftUpLeg','LeftLeg',0.07], LSH:['LeftLeg','LeftFoot',0.05], RTH:['RightUpLeg','RightLeg',0.07], RSH:['RightLeg','RightFoot',0.05] };
    const pts=(a,b,r,f0,f1)=>{const A=P(a),Bp=P(b),o=[]; for(let k=0;k<=8;k++){const f=f0+(f1-f0)*k/8; o.push(A.clone().lerp(Bp,f));} return o;};
    // --- self: arm/forearm points inside torso ellipse
    for(const nm of ['LUA','LFA','RUA','RFA']){
      const [a,b,r]=segs[nm]; const f0=nm.endsWith('UA')?0.4:0.0, f1=nm.endsWith('FA')?0.8:1.0;
      for(const p of pts(a,b,r,f0,f1)){
        const q=p.clone().sub(chest); const y=q.dot(up), x=q.dot(lat), z=q.dot(fw);
        const yh=hips.clone().sub(chest).dot(up), yn=neck.clone().sub(chest).dot(up);
        if(y<yh+0.05||y>yn) continue;
        const e=Math.hypot(x/0.17, z/0.105);
        if(e<0.85){ const k=nm; (rep.self[k]=rep.self[k]||[]).push([+s.toFixed(2),+e.toFixed(2)]); break; }
      }
    }
    // thigh vs forearm / forearm vs other arm
    const dseg=(a1,b1,a2,b2)=>{ // min distance between sampled segments
      let m=1e9; const A=pts(a1,b1,0,0,1), Bq=pts(a2,b2,0,0,1); for(const p of A) for(const q of Bq) m=Math.min(m,p.distanceTo(q)); return m; };
    const pairs=[['LFA','RFA',0.07],['LFA','RTH',0.11],['LFA','LTH',0.11],['RFA','LTH',0.11],['RFA','RTH',0.11],['LTH','RTH',0.10],['LSH','RSH',0.09]];
    for(const [x,y,th] of pairs){ const dd=dseg(segs[x][0],segs[x][1],segs[y][0],segs[y][1]); 
      if(['LTH','RTH','LSH','RSH'].includes(x)&&['LTH','RTH','LSH','RSH'].includes(y)){ if(dd<th*0.55){const k=x+'-'+y;(rep.self[k]=rep.self[k]||[]).push([+s.toFixed(2),+dd.toFixed(3)]);} }
      else if(dd<th*0.8){const k=x+'-'+y;(rep.self[k]=rep.self[k]||[]).push([+s.toFixed(2),+dd.toFixed(3)]);} }
    // --- props
    for(const nm of Object.keys(segs)){ const [a,b,r]=segs[nm]; const f1 = nm.endsWith('FA')? 0.75:1.0;
      const list=pts(a,b,r,0.1,f1); if(nm.endsWith('SH')){ list.push(P(a.replace('Leg','Foot')) ); }
      if(nm.endsWith('SH')){ const side=nm[0]==='L'?'Left':'Right'; list.push(P(side+'ToeBase')); }
      for(let mi=0;mi<meshes.length;mi++){ const m=meshes[mi]; if(!m.visible) continue; const inv=m.matrixWorld.clone().invert(); const gp=m.geometry.parameters; let hit=null;
        for(const p of list){ const l=p.clone().applyMatrix4(inv); const sc=new T.Vector3().setFromMatrixScale(m.matrixWorld); const lw=V(l.x*sc.x,l.y*sc.y,l.z*sc.z);
          let depth=-1;
          if(m.geometry.type==='BoxGeometry'){ const hx=gp.width*sc.x/2, hy=gp.height*sc.y/2, hz=gp.depth*sc.z/2; depth=Math.min(hx-Math.abs(lw.x),hy-Math.abs(lw.y),hz-Math.abs(lw.z)); }
          else { const R=gp.radiusTop*Math.max(sc.x,sc.z), H=gp.height*sc.y/2; depth=Math.min(R-Math.hypot(lw.x,lw.z)+ (R<0.04? r*0.0:0), H-Math.abs(lw.y)); }
          const need = (m.geometry.type==='CylinderGeometry' && gp.radiusTop<0.04) ? -r*0.3 : r*0.6;
          if(depth>need){ hit=depth; break; }
        }
        if(hit!==null){ const k=nm+' x '+mi+'('+m.geometry.type[0]+ (m.geometry.type==='BoxGeometry'? [gp.width,gp.height,gp.depth].map(v=>(v*Math.abs(new T.Vector3().setFromMatrixScale(m.matrixWorld).x)).toFixed(2)).join('x'):'r'+gp.radiusTop.toFixed(2))+' @'+m.getWorldPosition(new T.Vector3()).toArray().map(v=>v.toFixed(2)).join(',')+')'; (rep.prop[k]=rep.prop[k]||[]).push(+s.toFixed(2)); }
      }
    }
    // --- elbows
    for(const sd of ['Left','Right']){ const S=P(sd+'Arm'),E=P(sd+'ForeArm'),W=P(sd+'Hand'); const u=E.clone().sub(S).normalize(), f=W.clone().sub(E).normalize();
      const ang=Math.acos(Math.max(-1,Math.min(1,u.dot(f))))*180/Math.PI; // 0 straight, 180 folded
      const n=u.clone().cross(f); const nl=n.length(); const k=sd[0];
      (rep.elbow[k]=rep.elbow[k]||[]).push(+ang.toFixed(0));
      if(nl>0.15&&prevN[k]&&n.normalize().dot(prevN[k])<0.3){ (rep.elbow[k+'flip']=rep.elbow[k+'flip']||[]).push(+s.toFixed(2)); }
      if(nl>0.15) prevN[k]=n.clone().normalize();
      // elbow inside torso lateral width (elbow tucked into body) at upper-body level
      const q=E.clone().sub(chest); const xs=Math.abs(q.dot(lat)); if(xs<0.15 && Math.abs(q.dot(fw))<0.14 && q.dot(up)>-0.35){ (rep.self['elbow-in-torso '+k]=rep.self['elbow-in-torso '+k]||[]).push([+s.toFixed(2),+xs.toFixed(2)]); }
      if(prevE[k]){ const v=E.distanceTo(prevE[k]); if(v>0.09){ (rep.elbow[k+'jump']=rep.elbow[k+'jump']||[]).push([+s.toFixed(2),+v.toFixed(2)]); } } prevE[k]=E.clone();
    }
  }
  res[id]=rep;
}
return res; }
"""
async def main():
    ids=sys.argv[1].split(',')
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":390,"height":844})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:300]))
        await pg.goto("file:///home/claude/exercise-demos.html"); await pg.wait_for_timeout(4000)
        if ids==['all']: ids=await pg.evaluate("window.__ids()")
        out=await pg.evaluate(JS, ids)
        json.dump(out, open('/tmp/check.json','w'))
        print(errs); await b.close()
asyncio.run(main())
