import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--use-gl=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":390,"height":700}); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
        for ex in ["benchpress","gobletsquat"]:
            await pg.goto(f"file:///home/claude/app/demos.html?embed=1#{ex}"); await pg.wait_for_timeout(5000)
            await pg.screenshot(path=f"/tmp/demo_{ex}.png")
        print(errs); await b.close()
asyncio.run(main())
