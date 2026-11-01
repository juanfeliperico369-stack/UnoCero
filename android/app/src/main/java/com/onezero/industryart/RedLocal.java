package com.onezero.industryart;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.net.wifi.WifiManager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.ArrayDeque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * LAN rooms for the game: a room is announced on the local network with NSD (mDNS/DNS-SD),
 * players connect with plain TCP and exchange one text line per message. The game encrypts
 * every line with the room PIN before sending it, so this class only moves opaque text.
 */
final class RedLocal {

    interface Oyente {
        void evento(String tipo, String a, String b);
    }

    private static final String TIPO = "_industryart._tcp.";
    private static final int MAX_CONEXIONES = 4;
    private static final int MAX_LINEA = 256 * 1024;

    private final Context ctx;
    private final Oyente oyente;
    private final NsdManager nsd;
    private final ExecutorService hilos = Executors.newCachedThreadPool();
    private final Map<String, Conexion> conexiones = new ConcurrentHashMap<>();
    private final Map<String, NsdServiceInfo> salas = new ConcurrentHashMap<>();
    private final ArrayDeque<NsdServiceInfo> porResolver = new ArrayDeque<>();
    private final AtomicInteger contador = new AtomicInteger();

    private ServerSocket servidor;
    private NsdManager.RegistrationListener registro;
    private NsdManager.DiscoveryListener busqueda;
    private WifiManager.MulticastLock candado;
    private boolean resolviendo;

    RedLocal(Context ctx, Oyente oyente) {
        this.ctx = ctx.getApplicationContext();
        this.oyente = oyente;
        this.nsd = (NsdManager) this.ctx.getSystemService(Context.NSD_SERVICE);
    }

    /** Opens a room: listens on a free port and announces it on the network. */
    synchronized void crear(String nombre) {
        cerrarSala();
        hilos.execute(() -> {
            try {
                ServerSocket s = new ServerSocket(0);
                synchronized (this) {
                    servidor = s;
                }
                anunciar(nombre, s.getLocalPort());
                oyente.evento("sala", "ok", String.valueOf(s.getLocalPort()));
                while (!s.isClosed()) {
                    Socket cliente = s.accept();
                    if (conexiones.size() >= MAX_CONEXIONES) {
                        cliente.close();
                        continue;
                    }
                    abrir(cliente);
                }
            } catch (IOException e) {
                synchronized (this) {
                    if (servidor != null && !servidor.isClosed()) oyente.evento("error", "sala", String.valueOf(e.getMessage()));
                }
            }
        });
    }

    private void anunciar(String nombre, int puerto) {
        NsdServiceInfo info = new NsdServiceInfo();
        info.setServiceName(nombre == null || nombre.isEmpty() ? "Industry Art" : nombre);
        info.setServiceType(TIPO);
        info.setPort(puerto);
        registro = new NsdManager.RegistrationListener() {
            @Override
            public void onServiceRegistered(NsdServiceInfo i) {
                oyente.evento("anuncio", i.getServiceName(), "");
            }

            @Override
            public void onRegistrationFailed(NsdServiceInfo i, int codigo) {
                oyente.evento("error", "anuncio", String.valueOf(codigo));
            }

            @Override
            public void onServiceUnregistered(NsdServiceInfo i) {
            }

            @Override
            public void onUnregistrationFailed(NsdServiceInfo i, int codigo) {
            }
        };
        nsd.registerService(info, NsdManager.PROTOCOL_DNS_SD, registro);
    }

    /** Looks for rooms on the same network; each one found is reported as a "encontrada" event. */
    synchronized void buscar() {
        parar();
        WifiManager wifi = (WifiManager) ctx.getSystemService(Context.WIFI_SERVICE);
        if (wifi != null) {
            candado = wifi.createMulticastLock("industryart-lan");
            candado.setReferenceCounted(false);
            candado.acquire();
        }
        busqueda = new NsdManager.DiscoveryListener() {
            @Override
            public void onDiscoveryStarted(String tipo) {
                oyente.evento("buscando", "", "");
            }

            @Override
            public void onServiceFound(NsdServiceInfo info) {
                if (!TIPO.equals(info.getServiceType()) && !info.getServiceType().startsWith("_industryart._tcp")) return;
                resolver(info);
            }

            @Override
            public void onServiceLost(NsdServiceInfo info) {
                salas.remove(info.getServiceName());
                oyente.evento("perdida", info.getServiceName(), "");
            }

            @Override
            public void onDiscoveryStopped(String tipo) {
            }

            @Override
            public void onStartDiscoveryFailed(String tipo, int codigo) {
                oyente.evento("error", "busqueda", String.valueOf(codigo));
            }

            @Override
            public void onStopDiscoveryFailed(String tipo, int codigo) {
            }
        };
        nsd.discoverServices(TIPO, NsdManager.PROTOCOL_DNS_SD, busqueda);
    }

    private synchronized void resolver(NsdServiceInfo info) {
        porResolver.add(info);
        siguiente();
    }

    @SuppressWarnings("deprecation")
    private synchronized void siguiente() {
        if (resolviendo || porResolver.isEmpty()) return;
        resolviendo = true;
        NsdServiceInfo info = porResolver.poll();
        nsd.resolveService(info, new NsdManager.ResolveListener() {
            @Override
            public void onResolveFailed(NsdServiceInfo i, int codigo) {
                listo();
            }

            @Override
            public void onServiceResolved(NsdServiceInfo i) {
                InetAddress host = i.getHost();
                if (host != null) {
                    salas.put(i.getServiceName(), i);
                    oyente.evento("encontrada", i.getServiceName(), host.getHostAddress() + ":" + i.getPort());
                }
                listo();
            }
        });
    }

    private synchronized void listo() {
        resolviendo = false;
        siguiente();
    }

    synchronized void parar() {
        if (busqueda != null) {
            try {
                nsd.stopServiceDiscovery(busqueda);
            } catch (RuntimeException ignored) {
            }
            busqueda = null;
        }
        if (candado != null && candado.isHeld()) candado.release();
        candado = null;
        porResolver.clear();
        resolviendo = false;
    }

    /** Joins a room by "host:port". */
    void unirse(String destino) {
        hilos.execute(() -> {
            try {
                int k = destino.lastIndexOf(':');
                String host = destino.substring(0, k);
                int puerto = Integer.parseInt(destino.substring(k + 1));
                Socket s = new Socket();
                s.connect(new InetSocketAddress(host, puerto), 6000);
                abrir(s);
            } catch (Exception e) {
                oyente.evento("error", "unirse", String.valueOf(e.getMessage()));
            }
        });
    }

    private void abrir(Socket s) throws IOException {
        s.setTcpNoDelay(true);
        s.setKeepAlive(true);
        String id = "c" + contador.incrementAndGet();
        Conexion c = new Conexion(id, s);
        conexiones.put(id, c);
        oyente.evento("conectado", id, s.getInetAddress().getHostAddress());
        hilos.execute(c::leer);
    }

    /** Sends one line to a connection, or to every connection with id "*". */
    void enviar(String id, String linea) {
        if (linea == null || linea.length() > MAX_LINEA || linea.indexOf('\n') >= 0) return;
        if ("*".equals(id)) {
            for (Conexion c : conexiones.values()) hilos.execute(() -> c.escribir(linea));
        } else {
            Conexion c = conexiones.get(id);
            if (c != null) hilos.execute(() -> c.escribir(linea));
        }
    }

    void cerrar(String id) {
        Conexion c = conexiones.get(id);
        if (c != null) c.cerrar();
    }

    private synchronized void cerrarSala() {
        if (registro != null) {
            try {
                nsd.unregisterService(registro);
            } catch (RuntimeException ignored) {
            }
            registro = null;
        }
        if (servidor != null) {
            try {
                servidor.close();
            } catch (IOException ignored) {
            }
            servidor = null;
        }
    }

    /** Leaves the LAN: closes the room, the search and every connection. */
    void salir() {
        parar();
        cerrarSala();
        for (Conexion c : conexiones.values()) c.cerrar();
        conexiones.clear();
        salas.clear();
    }

    void destruir() {
        salir();
        hilos.shutdownNow();
    }

    private final class Conexion {
        final String id;
        final Socket socket;
        private final Object escritura = new Object();
        private volatile boolean cerrada;

        Conexion(String id, Socket socket) {
            this.id = id;
            this.socket = socket;
        }

        void leer() {
            try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8))) {
                String linea;
                while ((linea = in.readLine()) != null) {
                    if (linea.length() > MAX_LINEA) break;
                    oyente.evento("mensaje", id, linea);
                }
            } catch (IOException ignored) {
            }
            cerrar();
        }

        void escribir(String linea) {
            if (cerrada) return;
            synchronized (escritura) {
                try {
                    OutputStream out = socket.getOutputStream();
                    out.write((linea + "\n").getBytes(StandardCharsets.UTF_8));
                    out.flush();
                } catch (IOException e) {
                    cerrar();
                }
            }
        }

        void cerrar() {
            if (cerrada) return;
            cerrada = true;
            try {
                socket.close();
            } catch (IOException ignored) {
            }
            conexiones.remove(id);
            oyente.evento("desconectado", id, "");
        }
    }
}
