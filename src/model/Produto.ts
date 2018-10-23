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
}