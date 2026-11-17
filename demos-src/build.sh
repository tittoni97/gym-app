cp Xbot.glb model.glb
npx esbuild main.js --bundle --minify --format=iife --loader:.glb=binary --outfile=bundle.js --log-level=warning && python3 -I -c "
t=open('index.template.html').read(); b=open('bundle.js').read().replace('</script','<\\\\/script')
open('/home/claude/exercise-demos.html','w').write(t.replace('/*BUNDLE*/',b))"
