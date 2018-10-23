import { Produto } from "./Produto";

export class Venda {
    id: string;
    produto: Produto;
    quantidade: number;
    data: Date;
}