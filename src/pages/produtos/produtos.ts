import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutoPage } from './produto/produto';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

  itemSelected() {
    this.navCtrl.push(ProdutoPage);
  }

}
