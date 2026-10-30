#!/bin/bash
# Uso: tools/android.sh <html> <salida sin extensión> <keystore> <android.jar> <bundletool.jar>
# Arma la app Android propia desde android/ (WebView, sin anuncios ni compras): deja <salida>.apk firmado y <salida>.aab para Google Play.
# Variables: BT (build-tools), VC (versionCode), VN (versionName), KSPASS y KSALIAS (llave).
set -e
BT=${BT:-/tmp/bt/android-14}
VC=${VC:-11}
VN=${VN:-1.0}
KSPASS=${KSPASS:-industryart}
KSALIAS=${KSALIAS:-industryart}
R=$(cd "$(dirname "$0")/.." && pwd)
H=$(readlink -f "$1")
O=$(readlink -f "$(dirname "$2")")/$(basename "$2")
KS=$(readlink -f "$3")
AJ=$(readlink -f "$4")
BTJ=$(readlink -f "$5")
T=$(mktemp -d)
cd "$T"
mkdir -p assets/public cls dex m/manifest m/dex
cp "$H" assets/public/index.html
"$BT/aapt2" compile --dir "$R/android/res" -o res.zip
LINK="--manifest $R/android/AndroidManifest.xml -I $AJ --min-sdk-version 24 --target-sdk-version 36 --version-code $VC --version-name $VN -A assets"
"$BT/aapt2" link $LINK -o base.apk res.zip
"$BT/aapt2" link $LINK --proto-format -o proto.apk res.zip
javac -nowarn -Xlint:-options -source 8 -target 8 -bootclasspath "$AJ:$BT/core-lambda-stubs.jar" -d cls $(find "$R/android/src" -name '*.java')
"$BT/d8" --release --min-api 24 --output dex $(find cls -name '*.class')
# APK para instalar y probar
cp base.apk u.apk
zip -q -j u.apk dex/classes.dex
"$BT/zipalign" -f -p 4 u.apk a.apk
"$BT/apksigner" sign --ks "$KS" --ks-key-alias "$KSALIAS" --ks-pass pass:$KSPASS --key-pass pass:$KSPASS --v4-signing-enabled false --out "$O.apk" a.apk
"$BT/apksigner" verify "$O.apk"
# AAB para Google Play
(cd m && unzip -q ../proto.apk && mv AndroidManifest.xml manifest/ && cp ../dex/classes.dex dex/ && zip -q -r ../base.zip .)
java -jar "$BTJ" build-bundle --modules=base.zip --output=app.aab
jarsigner -keystore "$KS" -storepass $KSPASS -keypass $KSPASS -sigalg SHA256withRSA -digestalg SHA-256 app.aab $KSALIAS >/dev/null
java -jar "$BTJ" validate --bundle=app.aab >/dev/null
cp app.aab "$O.aab"
cd - >/dev/null
rm -rf "$T"
