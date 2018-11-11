import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstoqueService } from '../../service/EstoqueService';

@Component({
  selector: 'page-estoque-grafico',
  templateUrl: 'estoque-grafico.html',
})
export class EstoqueGraficoPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public estoqueService: EstoqueService) {
    
  }

  ionViewWillEnter() {
    this.estoqueService
      .listGrouped()
      .subscribe(produtosEstoque => {
        console.log(produtosEstoque);
      })
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
