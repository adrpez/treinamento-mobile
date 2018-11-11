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

    static listAllSql(): any {
        return 'SELECT Venda.id, Venda.quantidade, Venda.data, Venda.idProduto, Produto.valorUnitario, Produto.titulo FROM Venda INNER JOIN Produto ON Venda.idProduto = Produto.id';
    }

    static insertSql() : string {
        return 'INSERT INTO ' + 
                'Venda(' + 
                ' idProduto,' + 
                ' quantidade,' + 
                ' data,' +
                ' id' +
            ') VALUES (?,?,?,?);';
    }

    static updateSql() : string {
        return 'UPDATE ' + 
                'Venda SET ' + 
                ' idProduto=?,' + 
                ' quantidade=?,' + 
                ' data=?' +
            ' WHERE id=?;';
    }

    static deleteSql(): any {
        return 'DELETE FROM ' + 
                'Venda ' + 
            ' WHERE id=?;';
    }

    static fromDatabase(data: any): Venda {
        var venda = new Venda();
        venda.id = data.id;
        if (data.idProduto){
            venda.produto = new Produto();
            venda.produto.id = data.idProduto;
            venda.produto.valorUnitario = data.valorUnitario;
            venda.produto.titulo = data.titulo;
        }
        venda.quantidade = data.quantidade;
        venda.data = data.data;
        return venda;
    }

    static getValues(venda: Venda) : any[] {
        return [venda.produto? venda.produto.id: null, 
                venda.quantidade,
                venda.data,
                venda.id];
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