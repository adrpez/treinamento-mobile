import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Compra } from '../../../model/Compra';
import { ProdutoService } from '../../../service/ProdutoService';
import { CompraService } from '../../../service/CompraService';

@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {
  public compra: Compra;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner,
    private produtoService: ProdutoService,
    private toastCtrl: ToastController, 
    public compraService: CompraService) {
    
    this.compra = {
      quantidade: 0,
      produto: {
        valorUnitario: 0
      }
    } as Compra;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraPage');
  }

  ionViewWillEnter() {
    if (this.navParams) {
      this.compraService.getById(this.navParams.get("id")).subscribe((compra) => this.compra = compra);
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (this.compra.produto.id != ""){
        this.compra.produto.id = barcodeData.text;
        this.buscarProduto(this.compra.produto.id);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  buscarProduto(id) {
    this.produtoService.getById(id)
    .subscribe(produto => {
      if (produto){
        this.compra.produto = produto
      } else {
        const toast = this.toastCtrl.create({
          message: "Produto não encontrado",
          duration: 3000
        });
        toast.present();
      }
    });
  }

  valorTotal() {
    var valorUnitario = 0;
    var quantidade = 0;
    if (this.compra.produto.valorUnitario != undefined) {
      valorUnitario = this.compra.produto.valorUnitario;
    }
    if (this.compra.quantidade != undefined) {
      quantidade = this.compra.quantidade;
    }
    return valorUnitario * quantidade;
  }

  gravar() {
    this.compraService.store(this.compra)
    .subscribe(compra => {
      this.compra.id = compra.id;
      const toast = this.toastCtrl.create({
        message: "Compra gravada com sucesso.",
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
    });
  }

}
