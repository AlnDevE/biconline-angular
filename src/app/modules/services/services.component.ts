import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, first } from 'rxjs';
import { Office } from 'src/app/interfaces/office';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [MessageService]
})
export class ServicesComponent implements OnInit {

  user!: UserInfo;
  services!: Office[];
  loading: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private prestadorService: PrestadorService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.user = this.localStorageService.getUser();
   }

  ngOnInit(): void {
    this.loading = true;
    this.getServices();
  }

  getServices(){
    this.prestadorService.getServices(this.user.id).pipe(
      first(),
      finalize(() => this.loading = false)
    ).subscribe(
      (servicesResponse: any)=>{
        this.services = servicesResponse?.content as Office[];
      }
    )
  }

  onEdit(office: any){
    let obj = {...office};
    obj.categoria = office?.categoria?.nome;
    this.router.navigate(['services/offices', obj])
  }

  onDelete(office: any){
    this.loading = true;
    this.prestadorService.deleteOffice(office.id).pipe(
      first(),
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.showSuccess('Serviço deletado com sucesso!');
        this.getServices();
      },
      error: () => this.showError('Erro ao deletar serviço!')
    })
  }

  showSuccess(msg: string){
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: msg})
  }

  showError(msg: string){
    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg})
  }
}
