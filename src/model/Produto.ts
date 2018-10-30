import { Compra } from "./Compra";
import { Venda } from "./Venda";
import { Categoria } from "./Categoria";

export class Produto {
    
    id: string;
    titulo: string;
    categoria: Categoria;
    descricao: string;
    valorUnitario: number;
    estoqueInicial: number;
    thumbnail: string;
    foto: string;
    compras: Compra[];
    vendas: Venda[];

    static createTableSql() : string {
        return 'CREATE TABLE IF NOT EXISTS ' + 
                'Produto(id TEXT PRIMARY KEY,' + 
                ' titulo TEXT,' + 
                ' idCategoria TEXT,' + 
                ' tituloCategoria TEXT,' + 
                ' descricao TEXT,' + 
                ' valorUnitario REAL,' + 
                ' estoqueInicial REAL,' + 
                ' thumbnail TEXT,' + 
                ' foto TEXT' +
                ');';
    }

    static insertSql() : string {
        return 'INSERT INTO ' + 
                'Produto(id,' + 
                ' titulo,' + 
                ' idCategoria,' + 
                ' tituloCategoria,' + 
                ' descricao,' + 
                ' valorUnitario,' + 
                ' estoqueInicial,' + 
                ' thumbnail,' + 
                ' foto' +
            ') VALUES (?,?,?,?,?,?,?,?,?);';
    }

    static getValues(produto) : any[] {
        return [produto.id,
                produto.titulo, 
                produto.categoria? produto.categoria.id: null, 
                produto.categoria? produto.categoria.titulo: null, 
                produto.descricao, 
                produto.valorUnitario, 
                produto.estoqueInicial, 
                produto.thumbnail, 
                produto.foto];
    }

    static deleteAllSql(){
        return 'DELETE FROM Produto';
    }

    static listAllSql(){
        return 'SELECT * FROM Produto';
    }

    static entityName() {
        return 'Produto';
    }

    static fromDatabase(data: any): Produto {
        var produto = new Produto();
        produto.id = data.id;
        produto.titulo = data.titulo;
        produto.descricao = data.descricao;
        produto.valorUnitario = data.valorUnitario;
        produto.estoqueInicial = data.estoqueInicial;
        produto.thumbnail = data.thumbnail;
        produto.foto = data.foto;
        if (data.idCategoria || data.tituloCategoria) {
            produto.categoria = new Categoria();
            produto.categoria.id = data.idCategoria;
            produto.categoria.titulo = data.tituloCategoria;
        }
        return produto;
    }
}