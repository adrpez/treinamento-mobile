import { Produto } from "./Produto";

export class Compra {
    id: string;
    produto: Produto;
    quantidade: number;
    data: Date;

    static createTableSql(): string {
        return 'CREATE TABLE IF NOT EXISTS ' + 
                'Compra(id TEXT PRIMARY KEY,' + 
                ' idProduto TEXT,' + 
                ' quantidade INTEGER,' + 
                ' data TEXT' + 
                ');';
    }

    static entityName() {
        return 'Compra';
    }

    static listAllSql(): any {
        return 'SELECT * FROM Compra';
    }

    static insertSql() : string {
        return 'INSERT INTO ' + 
                'Compra(' + 
                ' idProduto,' + 
                ' quantidade,' + 
                ' data,' +
                ' id' +
            ') VALUES (?,?,?,?);';
    }

    static updateSql() : string {
        return 'UPDATE ' + 
                'Compra SET ' + 
                ' idProduto=?,' + 
                ' quantidade=?,' + 
                ' data=?' +
            ' WHERE id=?;';
    }

    static fromDatabase(data: any): Compra {
        var compra = new Compra();
        compra.id = data.id;
        if (data.idProduto){
            compra.produto = new Produto();
            compra.produto.id = data.idProduto;
        }
        compra.quantidade = data.quantidade;
        compra.data = data.data;
        return compra;
    }

    static getValues(compra: Compra) : any[] {
        return [compra.produto? compra.produto.id: null, 
                compra.quantidade,
                compra.data,
                compra.id];
    }
}