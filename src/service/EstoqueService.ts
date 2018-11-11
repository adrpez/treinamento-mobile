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
                let vendas:ProdutoEstoque[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    let venda = ProdutoEstoque.fromDatabase(result['rows'].item(i));
                    vendas.push(venda);
                }
                return vendas;
            });
  }
    
}