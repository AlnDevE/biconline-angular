import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
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
  solicitations: Solicitation[] = [];
  status!: any[];
  notContent: string = 'Você ainda não possui solicitações';
  loading: boolean = false;

  constructor(
    private authUser: AutenticacaoUsuarioService,
     private sharedService: SharedService,
     private messageService: MessageService,
     private router: Router
    ) {
    this.authUser.retornaUsuarioLogado().subscribe(
      (data: any) => {
        this.user = data as UserInfo;
        this.path = this.user.tipo == 'Cliente' ? 'clientes' : 'prestadores'
      }
    )
    this.status = [
      {name: 'Pendente', user: 'All'},
      {name: 'Encerrada', user: 'Prestador'},
      {name: 'Cancelada', user: 'Cliente'},
      {name: 'Aceita', user: 'Prestador'},
    ]
  }

  ngOnInit(): void {
    this.get_all_solicitations(+this.user.id);
  }

  get_all_solicitations(id: number){
    this.loading = true;
    this.sharedService.get_solicitations(id, this.path).pipe(
      first()
    ).subscribe({
      next: (data: any) => this.treatData(data),
      error: () => this.treatData([])
    })
  }

  treatData(data: any){
    this.loading = false;
    this.solicitations = data.map((element: Solicitation) =>{
      element.edit = false;
      element.editStatus = false;
      return element;
    })
  }

  onEdit(solicitation: Solicitation){
    this.solicitations = this.solicitations.map((element: Solicitation)=>{
      if(element.id == solicitation.id){
        element.edit = true;
        element.editStatus = true;
      }
      return element;
    })
  }

  onSave(solicitationChange: Solicitation){
    this.sharedService.putSolicitations(this.user.id, solicitationChange).pipe(
      first()
    ).subscribe({
      next: () => {
        this.showSuccess();
        this.ngOnInit();
      },
      error: () => {
        this.showError('Erro ao alterar solicitação')
      }
    })
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Solicitação alterada com sucesso!'});
  }

  showError(msg: string){
    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }

  onReport(solicitation: Solicitation){
    this.router.navigate(['providers/', solicitation.idPrestador, 'reports'])
  }

  onEvaluate(solicitation: Solicitation){
    this.router.navigate(['providers/evaluate', solicitation])
  }
}
