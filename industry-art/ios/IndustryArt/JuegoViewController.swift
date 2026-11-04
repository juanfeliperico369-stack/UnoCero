import UIKit
import WebKit

/// El juego completo (index.html) dentro de una WKWebView a pantalla completa.
/// Se sirve con un esquema propio (industryart://) para que localStorage e IndexedDB guarden las partidas.
final class JuegoViewController: UIViewController, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
    static let inicio = URL(string: "industryart://juego/index.html")!

    private var web: WKWebView!
    private var barraClara = false
    private var probado = false
    private var descargas: [ObjectIdentifier: URL] = [:]

    override var preferredStatusBarStyle: UIStatusBarStyle { barraClara ? .darkContent : .lightContent }

    override func loadView() {
        let conf = WKWebViewConfiguration()
        conf.setURLSchemeHandler(EsquemaJuego(), forURLScheme: "industryart")
        conf.websiteDataStore = .default()
        conf.allowsInlineMediaPlayback = true
        conf.mediaTypesRequiringUserActionForPlayback = []
        let uc = WKUserContentController()
        uc.add(PuenteDebil(self), name: "ia")
        uc.addUserScript(WKUserScript(source: Self.puenteJS, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        conf.userContentController = uc

        web = WKWebView(frame: .zero, configuration: conf)
        web.navigationDelegate = self
        web.uiDelegate = self
        web.allowsLinkPreview = false
        web.allowsBackForwardNavigationGestures = false
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.scrollView.bounces = false
        let fondo = UIColor(named: "Fondo") ?? .systemBackground
        web.isOpaque = false
        web.backgroundColor = fondo
        web.scrollView.backgroundColor = fondo
        #if DEBUG
        if #available(iOS 16.4, *) { web.isInspectable = true }
        #endif
        view = web
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        web.load(URLRequest(url: Self.inicio))
    }

    // MARK: - Puente con el juego (mismo contrato que window.AndroidBridge en Android)

    static let puenteJS = #"""
    (function () {
      var post = function (o) { try { window.webkit.messageHandlers.ia.postMessage(o); } catch (e) {} };
      window.AndroidBridge = {
        ios: true,
        guardar: function (n, t, txt) { post({ op: "guardar", n: String(n), t: String(t || ""), txt: String(txt) }); },
        guardarB64: function (n, t, b64) { post({ op: "guardarB64", n: String(n), t: String(t || ""), b64: String(b64) }); },
        imprimir: function (n, html) { post({ op: "imprimir", n: String(n), html: String(html) }); }
      };
      var ult = "";
      var fondo = function () {
        var e = document.elementFromPoint ? document.elementFromPoint(Math.max(1, window.innerWidth / 2), 2) : null;
        while (e) {
          var c = getComputedStyle(e).backgroundColor;
          if (c && c !== "transparent" && !/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(c)) return c;
          e = e.parentElement;
        }
        return document.documentElement ? getComputedStyle(document.documentElement).backgroundColor : "";
      };
      setInterval(function () {
        try { var c = fondo(); if (c && c !== ult) { ult = c; post({ op: "barra", c: c }); } } catch (e) {}
      }, 600);
      window.addEventListener("load", function () {
        if (typeof errInforme9 == "function") {
          var f = errInforme9;
          errInforme9 = function () { return f.apply(this, arguments).replace(" · app Android", " · app iOS"); };
        }
      });
    })();
    """#

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let d = message.body as? [String: Any], let op = d["op"] as? String else { return }
        let nombre = (d["n"] as? String) ?? "industry-art"
        switch op {
        case "guardar":
            compartir(nombre: nombre, datos: Data(((d["txt"] as? String) ?? "").utf8))
        case "guardarB64":
            if let b = d["b64"] as? String, let datos = Data(base64Encoded: b, options: .ignoreUnknownCharacters) {
                compartir(nombre: nombre, datos: datos)
            }
        case "imprimir":
            imprimir(nombre: nombre, html: (d["html"] as? String) ?? "")
        case "barra":
            if let c = d["c"] as? String { actualizarBarra(css: c) }
        default:
            break
        }
    }

    private func carpetaCompartir() -> URL {
        let u = FileManager.default.temporaryDirectory.appendingPathComponent("compartir", isDirectory: true)
        try? FileManager.default.createDirectory(at: u, withIntermediateDirectories: true)
        return u
    }

    private func limpio(_ n: String) -> String {
        let s = n.replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: ":", with: "_").trimmingCharacters(in: .whitespacesAndNewlines)
        return s.isEmpty ? "industry-art" : String(s.prefix(120))
    }

    private func compartir(nombre: String, datos: Data) {
        let u = carpetaCompartir().appendingPathComponent(limpio(nombre))
        do {
            try? FileManager.default.removeItem(at: u)
            try datos.write(to: u, options: .atomic)
        } catch {
            avisar(tx("No se pudo preparar el archivo", "The file couldn't be prepared", "Impossible de préparer le fichier", "Não foi possível preparar o arquivo"))
            return
        }
        compartir(archivo: u)
    }

    private func compartir(archivo u: URL) {
        let a = UIActivityViewController(activityItems: [u], applicationActivities: nil)
        if let p = a.popoverPresentationController {
            p.sourceView = view
            p.sourceRect = CGRect(x: view.bounds.midX, y: view.bounds.maxY - 80, width: 1, height: 1)
            p.permittedArrowDirections = []
        }
        presentar(a)
    }

    private func imprimir(nombre: String, html: String) {
        let pi = UIPrintInfo(dictionary: nil)
        pi.jobName = limpio(nombre)
        pi.outputType = .general
        let pc = UIPrintInteractionController.shared
        pc.printInfo = pi
        pc.printFormatter = UIMarkupTextPrintFormatter(markupText: html)
        if UIDevice.current.userInterfaceIdiom == .pad {
            pc.present(from: CGRect(x: view.bounds.midX, y: view.bounds.midY, width: 1, height: 1), in: view, animated: true)
        } else {
            pc.present(animated: true)
        }
    }

    private func actualizarBarra(css: String) {
        let n = css.components(separatedBy: CharacterSet(charactersIn: "0123456789.").inverted).filter { !$0.isEmpty }.compactMap(Double.init)
        guard n.count >= 3 else { return }
        if n.count >= 4 && n[3] == 0 { return }
        let k: Double = css.hasPrefix("color(") ? 255 : 1
        let lum = (0.299 * n[0] + 0.587 * n[1] + 0.114 * n[2]) * k / 255
        let clara = lum > 0.6
        if clara != barraClara {
            barraClara = clara
            setNeedsStatusBarAppearanceUpdate()
        }
    }

    // MARK: - Navegación: el juego se queda dentro; los enlaces externos van a Safari

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let u = navigationAction.request.url else { return decisionHandler(.cancel) }
        let esquema = (u.scheme ?? "").lowercased()
        if #available(iOS 14.5, *), navigationAction.shouldPerformDownload {
            return decisionHandler(.download)
        }
        if esquema == "industryart" || esquema == "about" {
            return decisionHandler(.allow)
        }
        if let f = navigationAction.targetFrame, !f.isMainFrame, esquema == "blob" || esquema == "data" {
            return decisionHandler(.allow)
        }
        if ["http", "https", "mailto", "tel", "sms"].contains(esquema) {
            UIApplication.shared.open(u)
        }
        decisionHandler(.cancel)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        if #available(iOS 14.5, *), !navigationResponse.canShowMIMEType {
            return decisionHandler(.download)
        }
        decisionHandler(.allow)
    }

    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let u = navigationAction.request.url, ["http", "https", "mailto"].contains((u.scheme ?? "").lowercased()) {
            UIApplication.shared.open(u)
        }
        return nil
    }

    /// Si iOS cierra el proceso web por memoria, el juego vuelve a abrirse en vez de quedar en blanco.
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        webView.load(URLRequest(url: Self.inicio))
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard ProcessInfo.processInfo.arguments.contains("-pruebaIA"), !probado else { return }
        probado = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            webView.callAsyncJavaScript(Self.pruebaJS, arguments: [:], in: nil, in: .page) { r in
                switch r {
                case .success(let v): print("PRUEBA_IA \(v)")
                case .failure(let e): print("PRUEBA_IA ERROR \(e)")
                }
                print("PRUEBA_IA_FIN")
                fflush(stdout)
            }
        }
    }

    // MARK: - Diálogos del juego (alert / confirm / prompt)

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: tx("Aceptar", "OK", "OK", "OK"), style: .default) { _ in completionHandler() })
        presentar(a, siNo: completionHandler)
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: tx("Cancelar", "Cancel", "Annuler", "Cancelar"), style: .cancel) { _ in completionHandler(false) })
        a.addAction(UIAlertAction(title: tx("Aceptar", "OK", "OK", "OK"), style: .default) { _ in completionHandler(true) })
        presentar(a, siNo: { completionHandler(false) })
    }

    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let a = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        a.addTextField { $0.text = defaultText }
        a.addAction(UIAlertAction(title: tx("Cancelar", "Cancel", "Annuler", "Cancelar"), style: .cancel) { _ in completionHandler(nil) })
        a.addAction(UIAlertAction(title: tx("Aceptar", "OK", "OK", "OK"), style: .default) { [weak a] _ in completionHandler(a?.textFields?.first?.text ?? "") })
        presentar(a, siNo: { completionHandler(nil) })
    }

    // MARK: - Utilidades

    private func presentar(_ vc: UIViewController, siNo: (() -> Void)? = nil) {
        var arriba: UIViewController = self
        while let p = arriba.presentedViewController, !p.isBeingDismissed { arriba = p }
        guard view.window != nil, !arriba.isBeingPresented else { siNo?(); return }
        arriba.present(vc, animated: true)
    }

    private func avisar(_ m: String) {
        let a = UIAlertController(title: nil, message: m, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: tx("Aceptar", "OK", "OK", "OK"), style: .default))
        presentar(a)
    }

    private func tx(_ es: String, _ en: String, _ fr: String, _ pt: String) -> String {
        switch (Locale.preferredLanguages.first ?? "es").prefix(2) {
        case "en": return en
        case "fr": return fr
        case "pt": return pt
        default: return es
        }
    }

    // MARK: - Prueba automática (solo con el argumento -pruebaIA, la usa la integración continua)

    static let pruebaJS = #"""
    const r = { version: VERN, puente: !!(window.AndroidBridge && window.AndroidBridge.ios), compresion: typeof CompressionStream, idioma: CFG.idi || "es" };
    try { localStorage.setItem("prueba9", "1"); r.localStorage = localStorage.getItem("prueba9") === "1"; } catch (e) { r.localStorage = String(e); }
    try { await idbTx("meta", "readonly", (s) => s.get("nada")); r.indexedDB = true; } catch (e) { r.indexedDB = String((e && e.message) || e); }
    r.inicio = document.body.innerText.replace(/\s+/g, " ").slice(0, 70);
    act("rapida");
    await new Promise((x) => setTimeout(x, 2000));
    r.partida = !!S;
    if (S) {
      try { cx(); } catch (e) {}
      for (let i = 0; i < 12; i++) { act("adv", 1); try { cx(); } catch (e) {} }
      r.fecha = yr() + " semana " + wk();
      const slot = SLOTS[SLOTS.length - 1];
      r.bytes = await guardar(slot);
      const m = await leerMeta(slot);
      r.formato = m && m.k;
      r.enIndexedDB = !!(await idbTx("meta", "readonly", (s) => s.get(slot)).catch(() => null));
      const a = { t: S.t, cash: Math.round(S.cash), pj: S.pj.length };
      const x = await cargarSlot(slot);
      r.recarga = x.t === a.t && Math.round(x.cash) === a.cash && x.pj.length === a.pj;
      irA(4, 0);
      r.pantalla = document.querySelector("#main") ? document.querySelector("#main").innerText.replace(/\s+/g, " ").slice(0, 80) : "";
    }
    r.errores = errLee9().map((e) => e.m);
    return JSON.stringify(r);
    """#
}

// MARK: - Descargas (por si el juego usa un enlace de descarga en vez del puente)

@available(iOS 14.5, *)
extension JuegoViewController: WKDownloadDelegate {
    func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) {
        download.delegate = self
    }

    func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) {
        download.delegate = self
    }

    func download(_ download: WKDownload, decideDestinationUsing response: URLResponse, suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
        let u = carpetaCompartir().appendingPathComponent(limpio(suggestedFilename))
        try? FileManager.default.removeItem(at: u)
        descargas[ObjectIdentifier(download)] = u
        completionHandler(u)
    }

    func downloadDidFinish(_ download: WKDownload) {
        if let u = descargas.removeValue(forKey: ObjectIdentifier(download)) { compartir(archivo: u) }
    }

    func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
        descargas.removeValue(forKey: ObjectIdentifier(download))
    }
}

/// Evita que WKUserContentController retenga al controlador (ciclo de memoria).
final class PuenteDebil: NSObject, WKScriptMessageHandler {
    weak var destino: WKScriptMessageHandler?
    init(_ d: WKScriptMessageHandler) { destino = d }
    func userContentController(_ u: WKUserContentController, didReceive m: WKScriptMessage) {
        destino?.userContentController(u, didReceive: m)
    }
}

/// Sirve los archivos del paquete de la app con el esquema industryart:// (solo por nombre, sin rutas).
final class EsquemaJuego: NSObject, WKURLSchemeHandler {
    private let tipos = [
        "html": "text/html; charset=utf-8", "js": "text/javascript; charset=utf-8", "css": "text/css; charset=utf-8",
        "json": "application/json", "png": "image/png", "jpg": "image/jpeg", "svg": "image/svg+xml",
    ]

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(URLError(.badURL))
            return
        }
        var nombre = url.lastPathComponent
        if nombre.isEmpty || nombre == "/" { nombre = "index.html" }
        let base = (nombre as NSString).deletingPathExtension, ext = (nombre as NSString).pathExtension.lowercased()
        guard let archivo = Bundle.main.url(forResource: base, withExtension: ext),
              let datos = try? Data(contentsOf: archivo, options: .mappedIfSafe) else {
            urlSchemeTask.didReceive(HTTPURLResponse(url: url, statusCode: 404, httpVersion: "HTTP/1.1", headerFields: ["Content-Length": "0"])!)
            urlSchemeTask.didFinish()
            return
        }
        let r = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: [
            "Content-Type": tipos[ext] ?? "application/octet-stream",
            "Content-Length": String(datos.count),
            "Cache-Control": "no-cache",
        ])!
        urlSchemeTask.didReceive(r)
        urlSchemeTask.didReceive(datos)
        urlSchemeTask.didFinish()
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}
}
