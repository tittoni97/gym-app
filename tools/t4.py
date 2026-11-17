import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=1, has_touch=True)
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append("PE "+str(e)[:300])); pg.on("console", lambda m: errs.append(m.text[:200]) if m.type=="error" else None)
        pg.on("dialog", lambda d: asyncio.ensure_future(d.accept()))
        await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1200)
        async def shot(n): await pg.screenshot(path=f"/tmp/n_{n}.png")
        await shot("home")
        await pg.click("nav button:nth-child(2)"); await pg.wait_for_timeout(200); await shot("train")
        await pg.click("[data-a=start] >> nth=0"); await pg.wait_for_timeout(300); await shot("w1")
        await pg.click(".xo .set >> nth=0 >> .tick"); await pg.wait_for_timeout(300); await shot("w2")
        await pg.click(".xo [data-a=info]"); await pg.wait_for_timeout(6000); await shot("demo")
        await pg.click("[data-a=dclose]"); await pg.wait_for_timeout(300)
        await pg.click("nav button:nth-child(3)"); await pg.wait_for_timeout(300); await shot("prog")
        await pg.click("[data-a=pg][data-v=vol]"); await pg.wait_for_timeout(300); await shot("vol")
        await pg.click("nav button:nth-child(4)"); await pg.wait_for_timeout(300); await shot("more")
        await pg.click("[data-a=sub][data-v=set]"); await pg.wait_for_timeout(300); await shot("set")
        print(errs); await b.close()
asyncio.run(main())
