import { Produto } from "./Produto";

export class Venda {
    id: string;
    produto: Produto;
    quantidade: number;
    data: Date;

    static createTableSql(): string {
        return 'CREATE TABLE IF NOT EXISTS ' + 
                'Venda(id TEXT PRIMARY KEY,' + 
                ' idProduto TEXT,' + 
                ' quantidade INTEGER,' + 
                ' data TEXT' + 
                ');';
    }

    static entityName() {
        return 'Venda';
    }
}