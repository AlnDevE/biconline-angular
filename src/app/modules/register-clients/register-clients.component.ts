import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import { UserForm } from 'src/app/interfaces/newUser';
import { UserExistsService } from 'src/app/functions/user-exists.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.scss']
})
export class RegisterClientsComponent implements OnInit {

  userForm!: FormGroup;

  tab: string  = 'clientes';
  sexo: any[];
  cities: any[];
  msgs!: Message[];

  constructor(
    private formBuilder: FormBuilder,
    private userExists: UserExistsService,
    private sharedService: SharedService,
    private router: Router
    ){
    this.sexo = [
      {tipo: 'Masculino'},
      {tipo: 'Feminino'}
    ];
    this.cities = [
      {name: 'Mogi Mirim'},
      {name: 'Mogi Guaçu'},
      {name: 'Itapira'},
      {name: 'Estiva Gerbi'},
      {name: 'Engenheiro Coelho'},
      {nome: 'Santo Antônio de Posse'}
  ];
  }

  ngOnInit(): void {
    this.userForm = this.getTypeOfForm();
  }

  onRegister(){
    if(this.userForm.valid){
      const newUser = this.userForm.getRawValue() as UserForm;
      this.sharedService.registerUser(newUser, this.tab).subscribe(
        () => {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 3000);
        },
        (error)=> {
          this.showError(error['error']['message']);
        })
    }
  }

  changeTab(){
    this.tab = this.tab == 'prestadores' ? 'clientes' : 'prestadores';
    this.userForm = this.getTypeOfForm();
  }

  getTypeOfForm(){
    if(this.tab == 'clientes'){
      return this.formBuilder.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email], [this.userExists.userExistsByEmail()]],
        cidade: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        senha: ['', [Validators.required]]
      });
    }
    else{
      return this.formBuilder.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required], [this.userExists.userExistsByEmail()]],
        telefone: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        senha: ['', [Validators.required]]
      });
    }
  }

  showSuccess() {
    this.msgs = [
        {severity:'success', summary:'Successo', detail:'Cadastrado com sucesso! Redirecionando...'}
    ]
  }

  showError(msg: string){
    this.msgs = [
      {severity:'error', summary:'Erro', detail:msg}
  ]
  }
}
