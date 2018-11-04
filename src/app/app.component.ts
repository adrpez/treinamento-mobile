import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseService } from '../service/DatabaseService';
import { Produto } from '../model/Produto';
import { Compra } from '../model/Compra';
import { Venda } from '../model/Venda';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    databaseService: DatabaseService, 
    fcm: FcmProvider, 
    toastCtrl: ToastController, 
    translate: TranslateService,
    globalization: Globalization) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Creates the tables of each entity
      databaseService.initDataBase([
        Produto,
        Compra,
        Venda
      ]);

      // Get a FCM token
      let token = fcm.getToken();
      console.log('FCM Token: ', token);

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg['body'],
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      globalization.getPreferredLanguage()
        .then(res => translate.use(res.value.split('-')[0]))
        .catch(e => console.log(e));
    });
  }
}

