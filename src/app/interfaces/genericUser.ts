import { Office } from "./office";
import { Rating } from "./rating";

export interface GenericUser{
    id: Number,
    nome: String,
    email: String,
    cidade: String,
    sexo: String,
    telefone: String,
    disponivel: Boolean,
    avaliacao?: Rating
    servico?: Office[],
    categoriaPrincipal?: String,
    descricaoPrincipal?: String,
    pathPhoto?: String
}
