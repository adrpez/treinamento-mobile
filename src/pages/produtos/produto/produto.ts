import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../../model/Produto';
import { ProdutoService } from '../../../service/ProdutoService';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  public produto: Produto = new Produto();
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
    this.produtoService.detail(this.navParams.get("id"))
    .subscribe({
      next: produto => this.produto = produto,
      error: val => console.log(`Error: ${val}`)
    });
  }

}
