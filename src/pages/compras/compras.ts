import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompraPage } from './compra/compra';
import { CompraService } from '../../service/CompraService';
import { Compra } from '../../model/Compra';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {
  private compras: Compra[] = [];
  private valorTotal: number = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public compraService: CompraService) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ComprasPage');
    this.compraService.list().subscribe(compras => this.compras = compras)
  }

  itemSelected(item) {
    this.navCtrl.push(CompraPage, item);
  } 

  add() {
    this.navCtrl.push(CompraPage);
  }

}
