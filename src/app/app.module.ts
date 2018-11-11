import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Firebase } from '@ionic-native/firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CompraPage } from '../pages/compras/compra/compra';
import { ComprasPage } from '../pages/compras/compras';
import { EstoquePage } from '../pages/estoque/estoque';
import { ProdutoPage } from '../pages/produtos/produto/produto';
import { ProdutosPage } from '../pages/produtos/produtos';
import { VendaPage } from '../pages/vendas/venda/venda';
import { VendasPage } from '../pages/vendas/vendas';
import { ProdutoService } from '../service/ProdutoService';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatabaseService } from '../service/DatabaseService';
import { SQLite } from '@ionic-native/sqlite';
/*import { SQLiteMock } from '../service/SQLiteMock';*/
import { FcmProvider } from '../providers/fcm/fcm';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { Globalization } from '@ionic-native/globalization'
import { CompraService } from '../service/CompraService';
import { VendaService } from '../service/VendaService';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CompraPage,
    ComprasPage,
    EstoquePage,
    HomePage,
    LoginPage,
    ProdutoPage,
    ProdutosPage,
    VendaPage,
    VendasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CompraPage,
    ComprasPage,
    EstoquePage,
    HomePage,
    LoginPage,
    ProdutoPage,
    ProdutosPage,
    VendaPage,
    VendasPage
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutoService,
    CompraService,
    VendaService,
    DatabaseService,
    SQLite,
    /*{ provide: SQLite, useClass: SQLiteMock },*/
    FcmProvider,
    BarcodeScanner,
    Globalization
  ]
})
export class AppModule {}
