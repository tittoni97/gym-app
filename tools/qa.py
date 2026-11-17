import asyncio, sys, json
from playwright.async_api import async_playwright
# usage: qa.py id1,id2,... outprefix  [views]
ids=sys.argv[1].split(','); pref=sys.argv[2]; views=(sys.argv[3] if len(sys.argv)>3 else 'side,three').split(',')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":390,"height":844}, device_scale_factor=1.0)
        errs=[]; pg.on("pageerror", lambda e: errs.append("PE "+str(e)[:300])); pg.on("console", lambda m: errs.append(m.text[:200]) if m.type=="error" else None)
        await pg.goto("file:///home/claude/exercise-demos.html"); await pg.wait_for_timeout(5000)
        for id in (ids if ids!=['all'] else await pg.evaluate("window.__ids()")):
            await pg.evaluate(f"window.__sel('{id}')")
            tempo = await pg.evaluate("window.__d.cur.tempo")
            t0,t1,t2,t3 = tempo
            # clock times: start hold, mid of go, end hold
            times=[t0*0.5, t0+t1*0.5, t0+t1+t2*0.5]
            k=0
            for v in views:
                await pg.evaluate(f"window.__setView('{v}')")
                for tm in times:
                    await pg.evaluate(f"window.__setClock({tm})"); await pg.wait_for_timeout(250)
                    el = await pg.query_selector("#stage"); await el.screenshot(path=f"/tmp/{pref}_{id}_{k}.png"); k+=1
        print(errs[:5]); await b.close()
asyncio.run(main())
