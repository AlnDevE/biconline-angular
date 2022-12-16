import { Component, OnInit } from '@angular/core';
import { Solicitation } from 'src/app/interfaces/solicitation';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.scss']
})
export class SolicitationsComponent implements OnInit {

  user!: UserInfo;
  path!: string;

  constructor(private authUser: AutenticacaoUsuarioService, private sharedService: SharedService) {
    this.authUser.retornaUsuarioLogado().subscribe(
      (data: any) => {
        this.user = data as UserInfo;
        this.path = this.user.tipo == 'Cliente' ? 'clientes' : 'prestadores'
      }
    )
  }

  selectedCustomer1!:any;
  solicitations: Solicitation[] = [
    {id:1, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 2, idPrestador: 44, status: 'Resolvido'},
    {id:22, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 3, idPrestador: 34, status: 'Aguardando'},
    {id:334, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 4, idPrestador: 70, status: 'Cancelado'},
    {id:12, data:'15-12-2022',descricao:'Limpar encanação',idCliente: 31, idPrestador: 67, status: 'Resolvido'}
  ]

  ngOnInit(): void {
    this.get_all_solicitations(+this.user.id);
  }

  get_all_solicitations(id: number){
    this.sharedService.get_solicitations(id, this.path).subscribe(
      (data: any) =>{
        this.solicitations = data as Solicitation[];
      }
    )
  }

}
