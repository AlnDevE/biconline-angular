import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import { UserForm } from 'src/app/interfaces/newUser';
import { UserExistsService } from 'src/app/functions/user-exists.service';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.scss']
})
export class RegisterClientsComponent implements OnInit {

  userForm!: FormGroup;

  tab: string  = 'cliente';
  sexo: any[];
  cities: any[];
  sexoSelected: any = undefined;
  citySelected: any = undefined;

  msgs1: Message[] = [];

  constructor(private formBuilder: FormBuilder, private userExists: UserExistsService) {
    this.sexo = [
      {tipo: 'Masculino'},
      {tipo: 'Feminino'}
    ];
    this.cities = [
      {name: 'Mogi Mirim'},
      {name: 'Mogi Guaçu'},
      {name: 'Itapira'},
      {name: 'Arthur Nogueira'},
      {name: 'Limeira'}
  ];
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required], [this.userExists.userExistsByEmail()]],
      telefone: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    })
  }

  onRegister(){
    if(this.userForm.valid){
      const newUser = this.userForm.getRawValue() as UserForm;
      console.log(newUser)
    }
  }

  changeTab(){
    console.log("t")
  }
}
