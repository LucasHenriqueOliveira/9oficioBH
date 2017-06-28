#!/usr/bin/env sh
ionic cordova build android --release
rm -f platforms/android/build/outputs/apk/9oficioBH.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
-keystore resources/cert/android/9oficioBH.keystore \
-storepass m4g4yumm1! \
-tsa http://timestamp.comodoca.com/rfc3161 \
platforms/android/build/outputs/apk/android-release-unsigned.apk \
com.9oficioBH
~/Library/Android/sdk/build-tools/24.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/9oficioBH.apk
open platforms/android/build/outputs/apk/
