export interface Solicitation{
  id: number,
  idCliente: number,
  idPrestador: number,
  descricao: string,
  data: Date,
  status: string,
  edit?: boolean,
  editStatus?: boolean
}
