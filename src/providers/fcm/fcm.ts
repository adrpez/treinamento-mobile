import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';

@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase, private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken() {

    let token;
  
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    } 
  
    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    } 
    
    return token;
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}
