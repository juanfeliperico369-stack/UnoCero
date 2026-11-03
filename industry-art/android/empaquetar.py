#!/usr/bin/env python3
"""Empaqueta Industry Art para Android: AAB para Play Store y APK universal, firmados con la clave de subida.

Uso:
    CLAVE_PW='contraseña' python3 empaquetar.py --html ../index.html --codigo 19 --nombre 1.0.1 \\
        --clave /ruta/industry-art-subida.jks --salida /ruta/salida

- Parte de plantilla/industry-art-base.aab (el bundle de la app sin firma y sin el juego).
- Mete el index.html, cambia versionCode / versionName en el manifiesto y firma el AAB con jarsigner.
- Del mismo AAB saca el APK universal con bundletool, firmado con la misma clave.
- Si faltan bundletool o las build-tools de Android, los descarga (dl.google.com / GitHub).

La contraseña se lee de CLAVE_PW o se pide por teclado. La clave nunca va al repositorio.
"""
import argparse
import getpass
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile

AQUI = os.path.dirname(os.path.abspath(__file__))
PLANTILLA = os.path.join(AQUI, 'plantilla', 'industry-art-base.aab')
ALIAS = 'industryart'
BUNDLETOOL = ('1.17.2', 'https://github.com/google/bundletool/releases/download/1.17.2/bundletool-all-1.17.2.jar')
BUILD_TOOLS = 'https://dl.google.com/android/repository/build-tools_r36_linux.zip'


def sh(*cmd, **kw):
    r = subprocess.run(list(cmd), capture_output=True, text=True, **kw)
    if r.returncode:
        sys.exit(f'falló {cmd[0]}: {r.stdout}\n{r.stderr}')
    return r.stdout


def herramientas(cache):
    os.makedirs(cache, exist_ok=True)
    bt = os.path.join(cache, f'bundletool-all-{BUNDLETOOL[0]}.jar')
    if not os.path.exists(bt):
        print('descargando bundletool…')
        urllib.request.urlretrieve(BUNDLETOOL[1], bt)
    aapt2 = shutil.which('aapt2') or next((os.path.join(r, 'aapt2') for r, _, fs in os.walk(cache) if 'aapt2' in fs), None)
    if not aapt2:
        print('descargando build-tools de Android…')
        z = os.path.join(cache, 'build-tools.zip')
        urllib.request.urlretrieve(BUILD_TOOLS, z)
        with zipfile.ZipFile(z) as f:
            f.extractall(cache)
        os.remove(z)
        aapt2 = next(os.path.join(r, 'aapt2') for r, _, fs in os.walk(cache) if 'aapt2' in fs)
        for r, _, fs in os.walk(os.path.dirname(aapt2)):
            for n in fs:
                os.chmod(os.path.join(r, n), 0o755)
    return bt, aapt2


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--html', required=True)
    ap.add_argument('--codigo', type=int, required=True, help='versionCode: siempre mayor que el anterior publicado')
    ap.add_argument('--nombre', required=True, help='versionName, por ejemplo 1.0.1')
    ap.add_argument('--clave', required=True, help='keystore .jks de subida')
    ap.add_argument('--salida', required=True)
    ap.add_argument('--herramientas', default=os.path.join(tempfile.gettempdir(), 'industry-art-android'))
    a = ap.parse_args()
    pw = os.environ.get('CLAVE_PW') or getpass.getpass('Contraseña de la clave: ')
    bt, aapt2 = herramientas(a.herramientas)
    os.makedirs(a.salida, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix='empaquetar-')
    try:
        # 1. manifiesto con la versión nueva
        with zipfile.ZipFile(PLANTILLA) as z:
            open(os.path.join(tmp, 'm0.xml'), 'wb').write(z.read('base/manifest/AndroidManifest.xml'))
        sh('javac', '-cp', bt, '-d', tmp, os.path.join(AQUI, 'ParcheManifiesto.java'))
        sh('java', '-cp', bt + os.pathsep + tmp, 'ParcheManifiesto', os.path.join(tmp, 'm0.xml'), os.path.join(tmp, 'm1.xml'), str(a.codigo), a.nombre)
        # 2. AAB: plantilla + juego + manifiesto
        aab = os.path.join(a.salida, f'industry-art-{a.nombre}.aab')
        html = open(a.html, 'rb').read()
        with zipfile.ZipFile(PLANTILLA) as zi, zipfile.ZipFile(aab, 'w') as zo:
            for info in zi.infolist():
                data = open(os.path.join(tmp, 'm1.xml'), 'rb').read() if info.filename == 'base/manifest/AndroidManifest.xml' else zi.read(info)
                ni = zipfile.ZipInfo(info.filename, date_time=info.date_time)
                ni.compress_type = info.compress_type
                zo.writestr(ni, data, compresslevel=9 if info.compress_type == zipfile.ZIP_DEFLATED else None)
                if info.filename == 'base/assets.pb':
                    ni = zipfile.ZipInfo('base/assets/index.html', date_time=info.date_time)
                    ni.compress_type = zipfile.ZIP_DEFLATED
                    zo.writestr(ni, html, compresslevel=9)
        sh('jarsigner', '-keystore', a.clave, '-storepass', pw, '-sigalg', 'SHA256withRSA', '-digestalg', 'SHA-256', '-sigfile', 'INDUSTRY', aab, ALIAS)
        sh('java', '-jar', bt, 'validate', '--bundle=' + aab)
        man = sh('java', '-jar', bt, 'dump', 'manifest', '--bundle=' + aab)
        assert f'android:versionCode="{a.codigo}"' in man and f'android:versionName="{a.nombre}"' in man, man[:400]
        # 3. APK universal desde el mismo AAB
        apks = os.path.join(tmp, 'u.apks')
        sh('java', '-jar', bt, 'build-apks', '--bundle=' + aab, '--output=' + apks, '--mode=universal', '--aapt2=' + aapt2,
           '--ks=' + a.clave, '--ks-pass=pass:' + pw, '--ks-key-alias=' + ALIAS, '--key-pass=pass:' + pw)
        apk = os.path.join(a.salida, f'industry-art-{a.nombre}.apk')
        with zipfile.ZipFile(apks) as z:
            open(apk, 'wb').write(z.read('universal.apk'))
        with zipfile.ZipFile(apk) as z:
            assert z.read('assets/index.html') == html
        print('AAB:', aab)
        print('APK:', apk)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == '__main__':
    main()
