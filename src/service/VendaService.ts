import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/Rx";
import { DatabaseService } from "./DatabaseService";
import { Venda } from "../model/Venda";
import { Guid } from "guid-typescript";

@Injectable()
export class VendaService {
    
    constructor(
        public databaseService: DatabaseService) { }

    list(): Observable<Venda[]> {
        return this.databaseService.executeSql(Venda.listAllSql())
            .map((result) => {
                let vendas:Venda[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    let venda = Venda.fromDatabase(result['rows'].item(i));
                    vendas.push(venda);
                }
                return vendas;
            });
    }

    store(venda: Venda): Observable<Venda> {
        if (venda.id){
            return this.databaseService.executeSql(Venda.updateSql(), Venda.getValues(venda))
                .map(() => venda);
        }else{
            venda.id = Guid.create().toString();
            return this.databaseService.executeSql(Venda.insertSql(), Venda.getValues(venda))
                .map(() => venda);;
        }
    }

    getById(id: string): Observable<Venda> {
        return this.list()
        .map((vendas) => vendas.filter(vendas => vendas.id == id)[0]);
    }

    delete(id: string) {
        return this.databaseService.executeSql(Venda.deleteSql(), [id]);
    }

    listByProdutoId(idProduto: string): Observable<Venda[]> {
        return this.list()
        .map((vendas) => vendas.filter(venda => venda.produto && venda.produto.id == idProduto));
    }

}