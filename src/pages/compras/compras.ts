import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public compraService: CompraService,
    public toastCtrl: ToastController) {
      this.valorTotal = this.valorTotal;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ComprasPage');
    this.atualizarLista();
  }

  atualizarLista(){
    this.compraService.list().subscribe(compras => {
      this.compras = compras
      this.atualizarValorTotal();
    });
  }

  atualizarValorTotal() {
    if (this.compras.length > 0) {
      this.valorTotal = this.compras
        .map((compra) => compra.ValorTotal())
        .reduce((a:number, b:number) => a + b);
    } else {
      this.valorTotal = 0;
    }
  }

  itemSelected(item) {
    this.navCtrl.push(CompraPage, item);
  } 

  add() {
    this.navCtrl.push(CompraPage);
  }

  remover(compra:Compra){
    this.compraService.delete(compra.id).subscribe((result) => {
      console.log(result);
      this.atualizarLista();

      const toast = this.toastCtrl.create({
        message: "Compra excluída com sucesso.",
        duration: 3000
      });
      toast.present();
    });
  }

}
