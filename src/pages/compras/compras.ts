import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompraPage } from './compra/compra';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

  itemSelected(item) {
    this.navCtrl.push(CompraPage);
  } 

  add() {
    this.navCtrl.push(CompraPage);
  }

}
