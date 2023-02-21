import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  user!: GenericUser;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;
  providerId: any;
  form!: FormGroup;
  currentUser!: UserInfo;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClienteService,
    private localStorageService: LocalStorageService
  ) {
    this.providerId = this.route.snapshot.paramMap.get('id')
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required]]
    })
    this.currentUser = this.localStorageService.getUser();
  }

  ngOnInit(): void {
    this.sharedService.getInfoById(this.providerId, 'Prestador').pipe(
      first()
    ).subscribe({
      next: (provider: any) => this.user = provider as GenericUser
    })
  }

  onReport(){
    let form = {
      prestador: this.user.id,
      cliente: this.currentUser.id,
      descricao: this.form.get('descricao')?.value
    };
    this.clientService.reportProvider(form).pipe(
      first()
    ).subscribe({
      next: () => console.log('reportado')
    })
  }
}
