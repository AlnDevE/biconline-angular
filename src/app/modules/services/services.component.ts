import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Office } from 'src/app/interfaces/office';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  user!: UserInfo;
  services!: Office[];

  constructor(
    private localStorageService: LocalStorageService,
    private prestadorService: PrestadorService,
    private router: Router
  ) {
    this.user = this.localStorageService.getUser();
   }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.prestadorService.getServices(this.user.id).pipe(
      first()
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
    this.prestadorService.deleteOffice(office.id).pipe(
      first()
    ).subscribe({
      next: () => {
        this.getServices();
      },
      error: () => console.log('deu ruim')
    })
  }
}
