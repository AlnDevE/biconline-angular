import { Component, OnInit } from '@angular/core';
import { Solicitation } from 'src/app/interfaces/solicitation';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.scss']
})
export class SolicitationsComponent implements OnInit {

  constructor() { }
  selectedCustomer1!:any;
  solicitations: Solicitation[] = [
    {id:1, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 2, idPrestador: 44, status: 'Resolvido'},
    {id:22, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 3, idPrestador: 34, status: 'Aguardando'},
    {id:334, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 4, idPrestador: 70, status: 'Cancelado'},
    {id:12, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 31, idPrestador: 67, status: 'Resolvido'}
  ]
  ngOnInit(): void {
  }

}
