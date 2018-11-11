import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/Rx";
import { DatabaseService } from "./DatabaseService";
import { Compra } from "../model/Compra";
import { Guid } from "guid-typescript";

@Injectable()
export class CompraService {
    
    constructor(
        public databaseService: DatabaseService) { }

    list(): Observable<Compra[]> {
        return this.databaseService.executeSql(Compra.listAllSql())
            .map((result) => {
                let compras:Compra[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    let compra = Compra.fromDatabase(result['rows'].item(i));
                    compras.push(compra);
                }
                return compras;
            });
    }

    store(compra: Compra): Observable<Compra> {
        if (compra.id){
            return this.databaseService.executeSql(Compra.updateSql(), Compra.getValues(compra))
                .map(() => compra);
        }else{
            compra.id = Guid.create().toString();
            return this.databaseService.executeSql(Compra.insertSql(), Compra.getValues(compra))
                .map(() => compra);;
        }
    }

    getById(id: string): Observable<Compra> {
        return this.list()
        .map((compras) => compras.filter(compras => compras.id == id)[0]);
    }

    listByProdutoId(idProduto: string): Observable<Compra[]> {
        return this.list()
        .map((compras) => compras.filter(compra => compra.produto && compra.produto.id == idProduto));
    }

    delete(id: string) {
        return this.databaseService.executeSql(Compra.deleteSql(), [id]);
    }

}