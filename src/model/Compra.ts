import { Produto } from "./Produto";

export class Compra {
    id: string;
    produto: Produto;
    quantidade: number;
    data: Date;
}