import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutoPage } from './produto/produto';
import { ProdutoService } from '../../service/ProdutoService';
import { Produto } from '../../model/Produto';

@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  private produtos: Produto[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
    this.produtoService.list()
        .subscribe(
          produtos => this.produtos = produtos,
          error => console.log(error));
  }

  itemSelected(item) {
    this.navCtrl.push(ProdutoPage, item);
  }

  doRefresh(refresher){
    this.produtoService.list()
        .subscribe(
          produtos => this.produtos = produtos,
          error => console.log(error),
          ()=>refresher.complete());
  }

}
