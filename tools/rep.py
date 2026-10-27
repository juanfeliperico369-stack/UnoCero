import sys,json
# uso: rep.py archivo pares.json  -> [[viejo,nuevo,ancla?],...]
p=sys.argv[1];s=open(p).read()
for x in json.load(open(sys.argv[2])):
    a,b=x[0],x[1];i=s.find(x[2]) if len(x)>2 else 0
    j=s.find(a,i)
    if j<0: print("NO:",a[:70]);continue
    if len(x)<3 and s.count(a)>1: print("MULTI:",a[:70]);continue
    s=s[:j]+b+s[j+len(a):]
open(p,'w').write(s)
