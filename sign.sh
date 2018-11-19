#!/bin/bash

APP_VERSION=1.0.0
APP_NAME=treinamento-mobile
JAVA_BIN=/c/Program\ Files/Java/jdk1.8.0_181/bin
ANDROID_BIN=/c/Users/arthur.santos/AppData/Local/Android/Sdk/build-tools/28.0.3/
KEYSTORE_PATH=./myKeystore.jks # location of release key

APK_PATH=./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
APK_DEST_PATH="./apks/$APP_NAME-$APP_VERSION.apk"
APK_ALIAS=treinamento-key

# signing apk with private key
"$JAVA_BIN/jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE_PATH $APK_PATH $APK_ALIAS

# optimizing apk
"$ANDROID_BIN/zipalign" -v 4 $APK_PATH $APK_DEST_PATH

