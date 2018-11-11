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
        return 'SELECT Compra.id, Compra.quantidade, Compra.data, Compra.idProduto, Produto.valorUnitario, Produto.titulo FROM Compra INNER JOIN Produto ON Compra.idProduto = Produto.id';
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

    static deleteSql(): any {
        return 'DELETE FROM ' + 
                'Compra ' + 
            ' WHERE id=?;';
    }

    static fromDatabase(data: any): Compra {
        var compra = new Compra();
        compra.id = data.id;
        if (data.idProduto){
            compra.produto = new Produto();
            compra.produto.id = data.idProduto;
            compra.produto.valorUnitario = data.valorUnitario;
            compra.produto.titulo = data.titulo;
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

    ValorTotal() {
        var valorUnitario = 0;
        var quantidade = 0;
        if (this.produto.valorUnitario != undefined) {
            valorUnitario = this.produto.valorUnitario;
        }
        if (this.quantidade != undefined) {
            quantidade = this.quantidade;
        }
        return valorUnitario * quantidade;
    }
}