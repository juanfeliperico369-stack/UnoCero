package com.industryart.juego;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedDispatcher;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

// INDUSTRY ART en Android: el juego corre en un WebView servido desde los assets, sin anuncios ni servicios externos
public class MainActivity extends Activity {
  private static final String HOST = "appassets.androidplatform.net";
  private static final String INICIO = "https://" + HOST + "/index.html";
  private static final int ELEGIR = 7;
  private static final int FONDO = 0xff0f1228;
  private WebView web;
  private WebView hoja;
  private ValueCallback<Uri[]> elegido;

  @Override
  protected void onCreate(Bundle b) {
    super.onCreate(b);
    FrameLayout raiz = new FrameLayout(this);
    raiz.setBackgroundColor(FONDO);
    web = new WebView(this);
    web.setBackgroundColor(FONDO);
    raiz.addView(web, new FrameLayout.LayoutParams(-1, -1));
    setContentView(raiz);
    raiz.setOnApplyWindowInsetsListener((v, ins) -> {
      if (Build.VERSION.SDK_INT >= 30) {
        android.graphics.Insets i = ins.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
        v.setPadding(i.left, i.top, i.right, i.bottom);
      } else {
        v.setPadding(ins.getSystemWindowInsetLeft(), ins.getSystemWindowInsetTop(), ins.getSystemWindowInsetRight(), ins.getSystemWindowInsetBottom());
      }
      return ins;
    });

    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setDatabaseEnabled(true);
    s.setAllowFileAccess(false);
    s.setAllowContentAccess(true);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setTextZoom(100);
    web.addJavascriptInterface(this, "AndroidBridge");
    web.setWebViewClient(new Cliente(this));
    web.setWebChromeClient(new Selector(this));
    if (Build.VERSION.SDK_INT >= 33) atrasNuevo();
    web.loadUrl(INICIO);
  }

  private void atrasNuevo() {
    getOnBackInvokedDispatcher().registerOnBackInvokedCallback(OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::atras);
  }

  // El juego decide: cierra la ventana abierta o vuelve al inicio; si no le queda nada que cerrar, sale de la app
  private void atras() {
    web.evaluateJavascript("(window.atrasAndroid && window.atrasAndroid()) ? 1 : 0", r -> {
      if (!"1".equals(r)) moveTaskToBack(true);
    });
  }

  @Override
  @SuppressWarnings("deprecation")
  public void onBackPressed() {
    atras();
  }

  @Override
  protected void onPause() {
    web.evaluateJavascript("window.alPausar && window.alPausar()", null);
    web.onPause();
    super.onPause();
  }

  @Override
  protected void onResume() {
    super.onResume();
    web.onResume();
  }

  @Override
  protected void onDestroy() {
    web.destroy();
    super.onDestroy();
  }

  @Override
  protected void onActivityResult(int q, int r, Intent d) {
    if (q == ELEGIR && elegido != null) {
      Uri u = r == RESULT_OK && d != null ? d.getData() : null;
      elegido.onReceiveValue(u != null ? new Uri[] {u} : null);
      elegido = null;
      return;
    }
    super.onActivityResult(q, r, d);
  }

  // Abre el selector de archivos del sistema para importar partidas
  boolean elige(ValueCallback<Uri[]> cb) {
    if (elegido != null) elegido.onReceiveValue(null);
    elegido = cb;
    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
    i.addCategory(Intent.CATEGORY_OPENABLE);
    i.setType("*/*");
    try {
      startActivityForResult(Intent.createChooser(i, null), ELEGIR);
    } catch (ActivityNotFoundException e) {
      elegido = null;
      return false;
    }
    return true;
  }

  static class Selector extends WebChromeClient {
    private final MainActivity a;

    Selector(MainActivity a) {
      this.a = a;
    }

    @Override
    public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
      return a.elige(cb);
    }
  }

  static class Cliente extends WebViewClient {
    private final MainActivity a;

    Cliente(MainActivity a) {
      this.a = a;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest q) {
      Uri u = q.getUrl();
      if (HOST.equals(u.getHost())) return false;
      String e = u.getScheme();
      if ("data".equals(e) || "blob".equals(e) || "about".equals(e)) return false;
      try {
        a.startActivity(new Intent(Intent.ACTION_VIEW, u));
      } catch (ActivityNotFoundException x) {
        // sin aplicación para abrir el enlace
      }
      return true;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest q) {
      Uri u = q.getUrl();
      if (!HOST.equals(u.getHost())) return null;
      String p = u.getPath();
      if (p == null || p.equals("/")) p = "/index.html";
      try {
        InputStream in = a.getAssets().open("public" + p);
        return new WebResourceResponse(tipo(p), "utf-8", in);
      } catch (IOException e) {
        return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", null, null);
      }
    }
  }

  private static String tipo(String p) {
    if (p.endsWith(".html")) return "text/html";
    if (p.endsWith(".js")) return "application/javascript";
    if (p.endsWith(".css")) return "text/css";
    if (p.endsWith(".png")) return "image/png";
    if (p.endsWith(".json")) return "application/json";
    return "application/octet-stream";
  }

  // Puente con el juego: AndroidBridge.guardar, guardarB64 e imprimir
  @JavascriptInterface
  public void guardar(String nombre, String tipo, String texto) {
    escribe(nombre, tipo, texto.getBytes(StandardCharsets.UTF_8));
  }

  @JavascriptInterface
  public void guardarB64(String nombre, String tipo, String b64) {
    escribe(nombre, tipo, Base64.decode(b64, Base64.DEFAULT));
  }

  @JavascriptInterface
  public void imprimir(String nombre, String html) {
    runOnUiThread(() -> imprime(nombre, html));
  }

  // Los archivos van a Descargas/INDUSTRY ART (en Android 9 o anterior, a la carpeta de la app)
  private void escribe(String nombre, String tipo, byte[] datos) {
    String n = nombre.replaceAll("[\\\\/:*?\"<>|]", "_");
    boolean ok = false;
    String donde;
    try {
      if (Build.VERSION.SDK_INT >= 29) {
        ContentValues c = new ContentValues();
        c.put(MediaStore.Downloads.DISPLAY_NAME, n);
        c.put(MediaStore.Downloads.MIME_TYPE, tipo == null || tipo.isEmpty() ? "application/octet-stream" : tipo);
        c.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/INDUSTRY ART");
        Uri u = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, c);
        if (u != null) {
          try (OutputStream o = getContentResolver().openOutputStream(u)) {
            o.write(datos);
            ok = true;
          }
        }
        donde = "Descargas/INDUSTRY ART";
      } else {
        File d = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
        if (d == null) d = getFilesDir();
        try (FileOutputStream o = new FileOutputStream(new File(d, n))) {
          o.write(datos);
          ok = true;
        }
        donde = d.getAbsolutePath();
      }
    } catch (Exception e) {
      donde = "";
    }
    final String js = ok
        ? "toast(L37('Guardado en " + donde + ": ', 'Saved to " + donde.replace("Descargas", "Downloads") + ": ') + " + JSONObject.quote(n) + ")"
        : "toast(L37('No se pudo guardar el archivo', 'The file couldn\\'t be saved'))";
    runOnUiThread(() -> web.evaluateJavascript("try{" + js + "}catch(e){}", null));
  }

  // Imprimir o guardar como PDF con el servicio de impresión de Android
  private void imprime(String nombre, String html) {
    hoja = new WebView(this);
    hoja.setWebViewClient(new Hoja(this, nombre));
    hoja.loadDataWithBaseURL(INICIO, html, "text/html", "utf-8", null);
  }

  static class Hoja extends WebViewClient {
    private final MainActivity a;
    private final String nombre;

    Hoja(MainActivity a, String nombre) {
      this.a = a;
      this.nombre = nombre;
    }

    @Override
    public void onPageFinished(WebView v, String url) {
      PrintManager pm = (PrintManager) a.getSystemService(PRINT_SERVICE);
      if (pm != null) pm.print(nombre, v.createPrintDocumentAdapter(nombre), new PrintAttributes.Builder().build());
    }
  }
}
