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
  solicitations!: Solicitation[];

  constructor(private authUser: AutenticacaoUsuarioService, private sharedService: SharedService) {
    this.authUser.retornaUsuarioLogado().subscribe(
      (data: any) => {
        this.user = data as UserInfo;
        this.path = this.user.tipo == 'Cliente' ? 'clientes' : 'prestadores'
      }
    )
  }

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
