import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(); await pg.goto("file:///home/claude/exercise-demos.html"); await pg.wait_for_timeout(4000)
        await pg.evaluate(f"window.__sel('{sys.argv[1]}')")
        for s in [float(x) for x in sys.argv[2].split(',')]:
            r=await pg.evaluate(f"""()=>{{const d=window.__d; d.applyAt({s}); const P=n=>d.wp(d.B[n]); const S=P('LeftArm'),E=P('LeftForeArm'),W=P('LeftHand'); const f=v=>v.toArray().map(x=>x.toFixed(2)).join(','); return 'S '+f(S)+' E '+f(E)+' W '+f(W)+' |SW| '+S.distanceTo(W).toFixed(3)+' ang '+(Math.acos(E.clone().sub(S).normalize().dot(W.clone().sub(E).normalize()))*57.3).toFixed(0);}}""")
            print(s, r)
        await b.close()
asyncio.run(main())
