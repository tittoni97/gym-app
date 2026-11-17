import sys
from PIL import Image
pref=sys.argv[1]; ids=sys.argv[2].split(','); out=sys.argv[3]; n=int(sys.argv[4]) if len(sys.argv)>4 else 6
SC=float(sys.argv[5]) if len(sys.argv)>5 else 0.8
rows=[]
for id in ids:
    ims=[Image.open(f'/tmp/{pref}_{id}_{k}.png') for k in range(n)]
    ims=[im.resize((int(im.width*SC), int(im.height*SC))) for im in ims]
    w,h=ims[0].size
    r=Image.new('RGB',(w*n,h),'white')
    for i,im in enumerate(ims): r.paste(im,(i*w,0))
    rows.append(r)
W=rows[0].width; H=sum(r.height for r in rows)
s=Image.new('RGB',(W,H),'white'); y=0
for r in rows: s.paste(r,(0,y)); y+=r.height
s.save(out); print(s.size)
