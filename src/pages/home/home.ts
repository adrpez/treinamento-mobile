import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { EstoquePage } from '../estoque/estoque';
import { ProdutosPage } from '../produtos/produtos';
import { VendasPage } from '../vendas/vendas';
import { ComprasPage } from '../compras/compras';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EstoquePage;
  pages: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Estoque', component: HomePage },
      { title: 'Produtos', component: ProdutosPage },
      { title: 'Compras', component: ComprasPage },
      { title: 'Vendas', component: VendasPage }
    ];
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
