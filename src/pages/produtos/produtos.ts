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

  itemSelected(item) {
    this.navCtrl.push(ProdutoPage);
  }

  doRefresh(refresher){
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
