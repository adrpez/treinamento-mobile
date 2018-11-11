import { Produto } from "./Produto";

export class ProdutoEstoque extends Produto {
    saldo: number;

    static listAllSql(): any {
        return 'SELECT Produto.id,' +
                    ' Produto.titulo,' +
                    ' Produto.idCategoria,' +
                    ' Produto.tituloCategoria,' + 
                    ' Produto.descricao,' +
                    ' Produto.valorUnitario,' +
                    ' Produto.estoqueInicial,' +
                    ' Produto.thumbnail,' +
                    ' Produto.foto,' +
                    ' SUM(Compra.quantidade) as compras,' +
                    ' SUM(Venda.quantidade) as vendas' +
                ' FROM Produto LEFT OUTER JOIN Compra' +
                    ' ON Produto.id = Compra.idProduto' +
                ' LEFT OUTER JOIN Venda' +
                    ' ON Produto.id = Venda.idProduto ' +
                'GROUP BY Produto.id,' +
                    ' Produto.titulo,' +
                    ' Produto.idCategoria,' +
                    ' Produto.tituloCategoria,' + 
                    ' Produto.descricao,' +
                    ' Produto.valorUnitario,' +
                    ' Produto.estoqueInicial,' +
                    ' Produto.thumbnail,' +
                    ' Produto.foto';
    }

    static fromDatabase(data: any): ProdutoEstoque {
        let produto = Produto.fromDatabase(data) as ProdutoEstoque;
        produto.saldo = data.saldo;
        produto.saldo = 0;
        if (data.compras) produto.saldo += data.compras;
        if (data.vendas) produto.saldo -= data.vendas;
        return produto;
    }
}