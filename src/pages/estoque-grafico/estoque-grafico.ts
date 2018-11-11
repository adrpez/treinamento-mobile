import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstoqueService } from '../../service/EstoqueService';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'page-estoque-grafico',
  templateUrl: 'estoque-grafico.html',
})
export class EstoqueGraficoPage {
  @ViewChild("baseChart") chart: BaseChartDirective;

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'pie';
  public isDataAvailable:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public estoqueService: EstoqueService) {
    
  }

  ionViewWillEnter() {
    this.estoqueService
      .listGrouped()
      .subscribe(produtosEstoque => {
        this.doughnutChartLabels = produtosEstoque.map(produto => produto.categoria.titulo);
        this.doughnutChartData = produtosEstoque.map(produto => produto.saldo);
        this.isDataAvailable = true;
      })
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
