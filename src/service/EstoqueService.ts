import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProdutoEstoque } from "../model/ProdutoEstoque";
import { ProdutoService } from "./ProdutoService";
import { CompraService } from "./CompraService";
import { VendaService } from "./VendaService";
import { DatabaseService } from "./DatabaseService";

@Injectable()
export class EstoqueService {
  constructor(
    public produtoService:ProdutoService,
    public compraService:CompraService,
    public vendaService:VendaService,
    public databaseService: DatabaseService
  ) { 
      
  }

  list(): Observable<ProdutoEstoque[]> {
    return this.databaseService.executeSql(ProdutoEstoque.listAllSql())
            .map((result) => {
                let produtos:ProdutoEstoque[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    let produto = ProdutoEstoque.fromDatabase(result['rows'].item(i));
                    produtos.push(produto);
                }
                return produtos;
            });
  }

  listGrouped(): Observable<ProdutoEstoque[]> {
    return this.databaseService.executeSql(ProdutoEstoque.listAllSql())
            .map((result) => {
                let produtos:ProdutoEstoque[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    let produto = ProdutoEstoque.fromDatabase(result['rows'].item(i));
                    let categoriasExistentes = produtos.filter(item => item.categoria.id == produto.categoria.id);
                    if (categoriasExistentes.length > 0){
                        categoriasExistentes[0].saldo += produto.saldo;
                    }else{
                        produtos.push(produto);
                    }
                }
                return produtos;
            });
  }
    
}