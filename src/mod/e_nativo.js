// ===== Guardar archivos en el teléfono (Android con Capacitor) =====
(() => {
  const C = window.Capacitor,
    P = C && C.Plugins;
  if (window.AndroidBridge || !P || !P.Filesystem) return;
  const b64u = (s) => {
    const u = new TextEncoder().encode(s);
    let r = "";
    for (let i = 0; i < u.length; i += 0x8000) r += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return btoa(r);
  };
  const guarda = (n, b64) =>
    P.Filesystem.writeFile({ path: "INDUSTRY ART/" + n, data: b64, directory: "DOCUMENTS", recursive: true })
      .then((r) => {
        toast(L37("Guardado en Documentos/INDUSTRY ART: ", "Saved to Documents/INDUSTRY ART: ") + n);
        if (P.Share && r && r.uri) return P.Share.share({ title: n, url: r.uri }).catch(() => {});
      })
      .catch(() =>
        P.Filesystem.writeFile({ path: n, data: b64, directory: "CACHE" }).then((r) => P.Share && P.Share.share({ title: n, url: r.uri })),
      )
      .catch(() => toast(L37("No se pudo guardar el archivo", "The file couldn't be saved")));
  window.AndroidBridge = {
    guardar: (n, t, txt) => guarda(n, b64u(String(txt))),
    guardarB64: (n, t, b64) => guarda(n, b64),
  };
})();
// Imprimir o guardar en PDF con el servicio de impresión de Android
(() => {
  const W0 = ACT["wdocb"];
  ACT["wdocb"] = (v0) => {
    const B = window.AndroidBridge,
      q = String(v0).split("|"),
      mo = q.length > 1 ? q[0] : "c",
      v = q.length > 1 ? q[1] : q[0];
    if (B && B.imprimir && !["html", "doc", "md"].includes(v)) {
      const d = DOCX || docDatos();
      try {
        B.imprimir(docNom(d, "pdf", mo), trHtml(docHTML(d, 0, mo)));
        return;
      } catch (e) {}
    }
    return W0(v0);
  };
})();
