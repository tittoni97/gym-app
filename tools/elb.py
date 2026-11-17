import asyncio, sys, json
from playwright.async_api import async_playwright
JS = r"""
(ids)=>{ const d=window.__d, T=d.THREE; const out={};
 for(const id of ids){ window.__sel(id); const rec={L:[],R:[]};
  for(let i=0;i<=40;i++){ d.applyAt(i/40);
   for(const sd of ['Left','Right']){ const b=d.B[sd+'ForeArm']; const r=d.REST[sd+'ForeArm']||d.REST['mixamorig'+sd+'ForeArm']; 
     const rq = r&&r.q? r.q : null; if(!rq){ out._err='no rest'; continue; }
     const rel=rq.clone().invert().multiply(b.quaternion); let w=Math.min(1,Math.abs(rel.w)); const ang=2*Math.acos(w)*180/Math.PI; const sg=rel.w<0?-1:1;
     const sn=Math.sqrt(1-w*w)||1; rec[sd[0]].push([+ang.toFixed(0), +(sg*rel.x/sn).toFixed(2), +(sg*rel.y/sn).toFixed(2), +(sg*rel.z/sn).toFixed(2)]); } }
  out[id]=rec; }
 return out; }
"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":390,"height":844})
        await pg.goto("file:///home/claude/exercise-demos.html"); await pg.wait_for_timeout(4000)
        ids=await pg.evaluate("window.__ids()")
        out=await pg.evaluate(JS, ids); json.dump(out, open('/tmp/elb.json','w')); await b.close()
asyncio.run(main())
