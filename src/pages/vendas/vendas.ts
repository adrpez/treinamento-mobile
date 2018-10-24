import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VendaPage } from './venda/venda';

/**
 * Generated class for the VendasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendasPage');
  }

  itemSelected(item) {
    this.navCtrl.push(VendaPage);
  }

}
