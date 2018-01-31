# 9oficioBH

cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="310624626048839" --variable APP_NAME="9º Ofício BH"


cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.875143511685-8u7fgr8bsj5u3kc932971fp4nudfgm43


cordova plugin add cordova-plugin-camera --variable CAMERA_USAGE_DESCRIPTION="your usage message" --variable PHOTOLIBRARY_USAGE_DESCRIPTION="your usage message"

keytool -exportcert -genkey -v -keystore resources/cert/android/9oficioBH.keystore -alias 9oficioBH -keyalg RSA -list -keysize 2048 -validity 10000
