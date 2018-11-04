import { Produto } from "../model/Produto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/Rx";
import { DatabaseService } from "./DatabaseService";
import { from } from "rxjs/observable/from";

@Injectable()
export class ProdutoService {
    private baseUrl = 'https://treinamento-nodejs.herokuapp.com/produtos';
    constructor(public http: HttpClient, 
                public databaseService: DatabaseService) { }

    list(): Observable<Produto[]> {
        return this.http.get(this.baseUrl)
        .catch(err=> Observable.throw(err.message));
    }

    storeOnCache(produtos: Produto[]) {
        this.deleteAll().subscribe(() => {
            from(produtos).map((produto) => {
                return this.databaseService.executeSql(Produto.insertSql(), Produto.getValues(produto));
            }).subscribe(
                sqlresults => {
                    console.log(sqlresults);
                }
            );
        });   
    }

    listFromCache():Observable<Produto[]> {
        return this.databaseService.executeSql(Produto.listAllSql())
            .map((result) => {
                var produtos : Produto[] = [];
                for (var i = 0, len = result['rows'].length; i < len; i++){
                    produtos.push(Produto.fromDatabase(result['rows'].item(i)));
                }
                return produtos;
            });
    }

    getById(id: string): Observable<Produto> {
        return this.listFromCache()
        .map(produtos => produtos.filter(produto => produto.id == id)[0]);
    }

    deleteAll() {
        return this.databaseService.executeSql(Produto.deleteAllSql());
    }

    detail(id: string) {
        return this.http.get(this.baseUrl + '/' + id)
        .catch(err=> Observable.throw(err.message));
    }
}