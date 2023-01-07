import { Office } from "./office";
import { Rating } from "./rating";

export interface GenericUser{
    id: number,
    nome: string,
    email: string,
    cidade: string,
    sexo: string,
    telefone: string,
    disponivel: boolean,
    avaliacao?: Rating
    servico?: Office[],
    categoriaPrincipal?: string,
    descricaoPrincipal?: string,
    pathPhoto?: string
}
