import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Venda } from '../../../model/Venda';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProdutoService } from '../../../service/ProdutoService';
import { VendaService } from '../../../service/VendaService';

@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {
  public venda: Venda;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner,
    private produtoService: ProdutoService,
    private toastCtrl: ToastController, 
    public vendaService: VendaService) {
    
    this.venda = {
      quantidade: 0,
      produto: {
        valorUnitario: 0
      }
    } as Venda;

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VendaPage');
  }

  ionViewWillEnter() {
    if (this.navParams.get("id")) {
      this.vendaService.getById(this.navParams.get("id")).subscribe((venda) => this.venda = venda);
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData.text != ""){
        this.venda.produto.id = barcodeData.text;
        this.buscarProduto(this.venda.produto.id);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  buscarProduto(id) {
    this.produtoService.getById(id)
    .subscribe(produto => {
      if (produto){
        this.venda.produto = produto
      } else {
        const toast = this.toastCtrl.create({
          message: "Produto não encontrado",
          duration: 3000
        });
        toast.present();
      }
    });
  }

  gravar() {
    this.vendaService.store(this.venda)
    .subscribe(venda => {
      this.venda.id = venda.id;
      const toast = this.toastCtrl.create({
        message: "Venda gravada com sucesso.",
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
    });
  }
}
