package com.onezero.industryart;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.activity.ComponentActivity;
import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.webkit.WebViewAssetLoader;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** Hosts the game (a single HTML file in the app assets) and connects it to Android. */
public class MainActivity extends ComponentActivity {

    private static final String ORIGEN = "appassets.androidplatform.net";
    private static final String INICIO = "https://" + ORIGEN + "/assets/index.html";

    private WebView web;
    private byte[] porGuardar;
    private ValueCallback<Uri[]> alElegir;
    private ActivityResultLauncher<Intent> crearArchivo;
    private ActivityResultLauncher<Intent> elegirArchivo;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle estado) {
        super.onCreate(estado);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        FrameLayout raiz = new FrameLayout(this);
        raiz.setBackgroundColor(0xFF13607A);
        web = new WebView(this);
        raiz.addView(web, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(raiz);

        new WindowInsetsControllerCompat(getWindow(), raiz).setAppearanceLightStatusBars(false);
        ViewCompat.setOnApplyWindowInsetsListener(raiz, (v, insets) -> {
            Insets barras = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets teclado = insets.getInsets(WindowInsetsCompat.Type.ime());
            v.setPadding(barras.left, barras.top, barras.right, Math.max(barras.bottom, teclado.bottom));
            return WindowInsetsCompat.CONSUMED;
        });

        crearArchivo = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), this::alCrearArchivo);
        elegirArchivo = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), this::alElegirArchivo);

        WebSettings ajustes = web.getSettings();
        ajustes.setJavaScriptEnabled(true);
        ajustes.setDomStorageEnabled(true);
        ajustes.setDatabaseEnabled(true);
        ajustes.setMediaPlaybackRequiresUserGesture(false);
        ajustes.setAllowFileAccess(false);
        ajustes.setAllowContentAccess(true);
        ajustes.setTextZoom(100);

        WebViewAssetLoader cargador = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView vista, WebResourceRequest pedido) {
                return cargador.shouldInterceptRequest(pedido.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView vista, WebResourceRequest pedido) {
                Uri destino = pedido.getUrl();
                if (ORIGEN.equals(destino.getHost())) return false;
                abrirFuera(destino);
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView vista, ValueCallback<Uri[]> callback, FileChooserParams parametros) {
                if (alElegir != null) alElegir.onReceiveValue(null);
                alElegir = callback;
                try {
                    elegirArchivo.launch(parametros.createIntent());
                } catch (ActivityNotFoundException e) {
                    alElegir = null;
                    return false;
                }
                return true;
            }
        });

        web.addJavascriptInterface(new Puente(), "AndroidBridge");

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                web.evaluateJavascript("(window.atrasAndroid && window.atrasAndroid()) ? 1 : 0", resultado -> {
                    if (!"1".equals(resultado)) moveTaskToBack(true);
                });
            }
        });

        if (estado != null) web.restoreState(estado);
        else web.loadUrl(INICIO);
    }

    @Override
    protected void onSaveInstanceState(Bundle estado) {
        super.onSaveInstanceState(estado);
        web.saveState(estado);
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

    private void abrirFuera(Uri destino) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, destino));
        } catch (ActivityNotFoundException ignored) {
        }
    }

    private void pedirArchivo(String nombre, String tipo, byte[] datos) {
        porGuardar = datos;
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(tipo == null || tipo.isEmpty() ? "application/octet-stream" : tipo);
        intent.putExtra(Intent.EXTRA_TITLE, nombre);
        try {
            crearArchivo.launch(intent);
        } catch (ActivityNotFoundException e) {
            porGuardar = null;
            avisarGuardado(false);
        }
    }

    private void alCrearArchivo(ActivityResult resultado) {
        byte[] datos = porGuardar;
        porGuardar = null;
        Uri destino = resultado.getData() != null ? resultado.getData().getData() : null;
        if (resultado.getResultCode() != Activity.RESULT_OK || destino == null || datos == null) return;
        boolean ok;
        try (OutputStream salida = getContentResolver().openOutputStream(destino)) {
            if (salida == null) throw new IllegalStateException();
            salida.write(datos);
            ok = true;
        } catch (Exception e) {
            ok = false;
        }
        avisarGuardado(ok);
    }

    private void alElegirArchivo(ActivityResult resultado) {
        if (alElegir == null) return;
        alElegir.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultado.getResultCode(), resultado.getData()));
        alElegir = null;
    }

    private void avisarGuardado(boolean ok) {
        web.evaluateJavascript("window.alGuardar && window.alGuardar(" + ok + ")", null);
    }

    /** Functions the game calls through window.AndroidBridge. */
    private final class Puente {
        @JavascriptInterface
        public void guardar(String nombre, String tipo, String texto) {
            byte[] datos = texto == null ? new byte[0] : texto.getBytes(StandardCharsets.UTF_8);
            runOnUiThread(() -> pedirArchivo(nombre, tipo, datos));
        }

        @JavascriptInterface
        public void guardarB64(String nombre, String tipo, String base64) {
            byte[] datos;
            try {
                datos = Base64.decode(base64 == null ? "" : base64, Base64.DEFAULT);
            } catch (IllegalArgumentException e) {
                runOnUiThread(() -> avisarGuardado(false));
                return;
            }
            runOnUiThread(() -> pedirArchivo(nombre, tipo, datos));
        }
    }
}
