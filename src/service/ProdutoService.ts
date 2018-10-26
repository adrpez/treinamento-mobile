import { Produto } from "../model/Produto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/Rx";

@Injectable()
export class ProdutoService {
    private baseUrl = 'https://treinamento-nodejs.herokuapp.com/produtos';
    constructor(public http: HttpClient) { }

    list(): Observable<Produto[]> {
        return this.http.get(this.baseUrl)
        .catch(err=> Observable.throw(err.message));
    }

    detail(id: string) {
        return this.http.get(this.baseUrl + '/' + id)
        .catch(err=> Observable.throw(err.message));
    }
}