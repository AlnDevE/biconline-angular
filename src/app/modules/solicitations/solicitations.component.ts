import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  status!: any[];

  constructor(
    private authUser: AutenticacaoUsuarioService,
     private sharedService: SharedService,
     private messageService: MessageService
    ) {
    this.authUser.retornaUsuarioLogado().subscribe(
      (data: any) => {
        this.user = data as UserInfo;
        this.path = this.user.tipo == 'Cliente' ? 'clientes' : 'prestadores'
      }
    )
    this.status = [
      {name: 'Pendente'},
      {name: 'Encerrada'},
      {name: 'Cancelada'},
      {name: 'Aceita'},
    ]
  }

  ngOnInit(): void {
    this.get_all_solicitations(+this.user.id);
  }

  get_all_solicitations(id: number){
    this.sharedService.get_solicitations(id, this.path).subscribe(
      (data: any) =>{
        this.treatData(data);
      }
    )
  }

  treatData(data: any){
    this.solicitations = data.map((element: Solicitation) =>{
      element.edit = true;
      element.editStatus = true;
      return element;
    })
  }

  onEdit(solicitation: Solicitation){
    this.solicitations = this.solicitations.map((element: Solicitation)=>{
      if(element.id == solicitation.id){
        if(element.status == 'Pendente' || this.user.tipo == 'Cliente'){
          element.edit = true
        }
        else{
          element.editStatus = false;
        }
      }
      return element;
    })
  }

  onSave(solicitationChange: Solicitation){
    this.sharedService.putSolicitations(this.user.id, solicitationChange).subscribe(
      ()=>{
        this.showSuccess();
        this.ngOnInit();
      },
      ()=>{
        this.showError('Erro ao alterar solicitação')
      }
    )
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Solicitação alterada com sucesso!'});
  }

  showError(msg: string){
    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }
}
