import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { EstoquePage } from '../estoque/estoque';
import { ProdutosPage } from '../produtos/produtos';
import { VendasPage } from '../vendas/vendas';
import { ComprasPage } from '../compras/compras';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EstoquePage;
  pages: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {


    translateService.get(['ESTOQUE', 'PRODUTOS', 'COMPRAS', 'VENDAS']).subscribe(
      values => {
        this.pages = [
          { title: values.ESTOQUE, component: HomePage },
          { title: values.PRODUTOS, component: ProdutosPage },
          { title: values.COMPRAS, component: ComprasPage },
          { title: values.VENDAS, component: VendasPage }
        ];
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  sair() {
    this.nav.setRoot(LoginPage);
  }

}
