import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        ctx = await b.new_context(viewport={"width":390,"height":844}, device_scale_factor=1, has_touch=True)
        pg = await ctx.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append("PE "+str(e)[:300])); pg.on("console", lambda m: errs.append(m.text[:200]) if m.type=="error" else None)
        await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
        async def shot(n): await pg.screenshot(path=f"/tmp/app_{n}.png")
        await shot("home")
        await pg.click("nav button:nth-child(2)"); await pg.wait_for_timeout(200); await shot("train")
        await pg.click("[data-a=start]"); await pg.wait_for_timeout(300); await shot("w1")
        # tick set 1 of the first exercise
        await pg.click(".ex.open .set .tick"); await pg.wait_for_timeout(400); await shot("w2")
        await pg.click(".ex.open .set:nth-of-type(2) .step button[data-f=kg][data-d='2.5']") if False else None
        print(errs); await b.close()
asyncio.run(main())
