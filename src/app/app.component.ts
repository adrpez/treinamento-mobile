import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DatabaseService } from '../service/DatabaseService';
import { Produto } from '../model/Produto';
import { Compra } from '../model/Compra';
import { Venda } from '../model/Venda';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, databaseService: DatabaseService) {
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
    });
  }
}

