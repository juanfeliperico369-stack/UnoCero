#!/bin/bash
# Uso: tools/apk.sh <apk base> <html> <salida.apk> <keystore>
set -e
BT=${BT:-/tmp/bt/android-14}
T=$(mktemp -d)
cp "$1" "$T/b.apk"
mkdir -p "$T/assets/public"
cp "$2" "$T/assets/public/index.html"
cd "$T"
zip -q -d b.apk 'META-INF/*.SF' 'META-INF/*.RSA' 'META-INF/*.EC' 'META-INF/*.DSA' 'META-INF/MANIFEST.MF' 2>/dev/null || true
zip -q -9 b.apk assets/public/index.html
"$BT/zipalign" -f -p 4 b.apk a.apk
"$BT/apksigner" sign --ks "$4" --ks-pass pass:${KSPASS:-industryart} --key-pass pass:${KSPASS:-industryart} --out out.apk a.apk
"$BT/apksigner" verify out.apk
cd - >/dev/null
cp "$T/out.apk" "$3"
rm -rf "$T"
