import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { EstoqueService } from '../../service/EstoqueService';
import { ProdutoEstoque } from '../../model/ProdutoEstoque';
import { EstoqueGraficoPage } from '../estoque-grafico/estoque-grafico';

@Component({
  selector: 'page-estoque',
  templateUrl: 'estoque.html',
})
export class EstoquePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public estoqueService: EstoqueService,
    public modalCtrl: ModalController) {
  }

  private produtosEstoque: ProdutoEstoque[] = [];
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EstoquePage');
    
    this.estoqueService
      .list()
      .subscribe(produtosEstoque => this.produtosEstoque = produtosEstoque)
  }

  getItems(filter) {
    console.log('getItems EstoquePage', filter);
  }

  presentModal() {
    const modal = this.modalCtrl.create(EstoqueGraficoPage);
    modal.present();
  }
}
