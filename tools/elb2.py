import asyncio, json
from playwright.async_api import async_playwright
JS = r"""
()=>{ const d=window.__d, T=d.THREE, P=n=>d.wp(d.B[n]); const out={};
 for(const id of window.__ids()){ window.__sel(id); let fwmin=9, xmin=9, wb=9;
  for(let i=0;i<=40;i++){ d.applyAt(i/40);
   const hips=P('Hips'), neck=P('Neck'), up=neck.clone().sub(hips).normalize();
   const lat=P('LeftArm').sub(P('RightArm')); lat.sub(up.clone().multiplyScalar(lat.dot(up))).normalize(); const fw=lat.clone().cross(up).normalize();
   for(const sd of ['Left','Right']){ const S=P(sd+'Arm'),E=P(sd+'ForeArm'),W=P(sd+'Hand'); const u=E.clone().sub(S).normalize();
     const sg=sd==='Left'?1:-1; fwmin=Math.min(fwmin,u.dot(fw)); xmin=Math.min(xmin,sg*u.dot(lat));
     const f=W.clone().sub(E).normalize(); wb=Math.min(wb, sg*f.dot(lat)); } }
  out[id]=[+fwmin.toFixed(2),+xmin.toFixed(2),+wb.toFixed(2)]; }
 return out; }
"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":390,"height":844})
        await pg.goto("file:///home/claude/exercise-demos.html"); await pg.wait_for_timeout(4000)
        out=await pg.evaluate(JS)
        for k,v in out.items(): print(f"{k:14s} humerus-fw-min {v[0]:5.2f}  humerus-lat-min {v[1]:5.2f}  forearm-lat-min {v[2]:5.2f}")
        await b.close()
asyncio.run(main())
