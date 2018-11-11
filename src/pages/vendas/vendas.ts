import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { VendaPage } from './venda/venda';
import { VendaService } from '../../service/VendaService';
import { Venda } from '../../model/Venda';

@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {
  private vendas: Venda[] = [];
  private valorTotal: number = 0;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public vendaService: VendaService,
    public toastCtrl: ToastController) {
      this.valorTotal = this.valorTotal;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter VendasPage');
    this.atualizarLista();
  }

  atualizarLista(){
    this.vendaService.list().subscribe(vendas => this.vendas = vendas)
    this.atualizarValorTotal();
  }

  atualizarValorTotal() {
    if (this.vendas.length > 0) {
      this.valorTotal = this.vendas
        .map((venda) => venda.ValorTotal())
        .reduce((a:number, b:number) => a + b);
    } else {
      this.valorTotal = 0;
    }
  }

  itemSelected(item) {
    this.navCtrl.push(VendaPage, item);
  } 

  add() {
    this.navCtrl.push(VendaPage);
  }

  remover(venda:Venda){
    this.vendaService.delete(venda.id).subscribe((result) => {
      console.log(result);
      this.atualizarLista();

      const toast = this.toastCtrl.create({
        message: "Venda excluída com sucesso.",
        duration: 3000
      });
      toast.present();
    });
  }

}
