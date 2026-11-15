import re
t=open('src/index.template.html').read()
css=open('src/app.css').read(); data=open('src/data.js').read(); app=open('src/app.js').read()
out=t.replace('/*CSS*/',css).replace('/*DATA*/',data).replace('/*APP*/',app)
open('index.html','w').write(out); print(len(out))
