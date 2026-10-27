#!/usr/bin/env python3
# Arma dist/INDUSTRY_ART.html: base + módulos de src/mod (orden alfabético) y limpia comentarios de desarrollo.
import os, re, glob, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(R, "src/base.html"), encoding="utf-8").read()
css = "".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(os.path.join(R, "src/mod/*.css"))))
js = "".join(open(f, encoding="utf-8").read() + "\n" for f in sorted(glob.glob(os.path.join(R, "src/mod/*.js"))))
i = s.index("</style></head>")
s = s[:i] + "\n" + css + s[i:]
ancla = "\naplicarCfg();\nidiomaIni();\n"
j = s.rindex(ancla)
s = s[:j] + "\n" + js + s[j:]
a = s.index('<script id="juego">')
b = s.rindex("</script>")
head, code, tail = s[:a], s[a:b], s[b:]
out = []
for ln in code.split("\n"):
    t = ln.strip()
    if t.startswith("// ") or t == "//" or (t.startswith("/* ====") and t.endswith("*/")):
        continue
    out.append(ln)
code = "\n".join(out)
head = re.sub(r"/\* =====[^*]*\*/\n?", "", head)
s = head + code + tail
os.makedirs(os.path.join(R, "dist"), exist_ok=True)
open(os.path.join(R, "dist/INDUSTRY_ART.html"), "w", encoding="utf-8").write(s)
open(os.path.join(R, "dist/.code.js"), "w", encoding="utf-8").write(code[len('<script id="juego">'):])
print("ok", len(s))
