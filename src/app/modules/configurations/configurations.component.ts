import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  user!: UserInfo;
  formAvailable!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private prestadorService: PrestadorService,
    private sharedService: SharedService
    ) {
  }

  ngOnInit(): void {
    this.user = this.getUser() as UserInfo;
    this.setGroup();
    this.sharedService.getInfoById(this.user.id, this.user.tipo).pipe(
      first()
    ).subscribe(
      (data:any) =>{
        this.formAvailable.get('available')?.setValue(data?.disponivel)
      }
    )
  }

  getUser(){
    let userToParse = localStorage.getItem('userinfo');
    return userToParse ? JSON.parse(userToParse) : undefined
  }

  setGroup(){
    this.formAvailable = this.formBuilder.group({
      available: ['',[Validators.required]]
    })
  }

  setAvailable(){
    this.prestadorService.putAvailable(
      this.formAvailable.get('available')?.value, this.user.id
    ).pipe(
      first()
    ).subscribe()
  }

}
