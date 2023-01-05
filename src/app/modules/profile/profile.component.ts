import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize, first, map, mergeMap, pipe } from 'rxjs';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: GenericUser;
  userForm!: FormGroup;
  tipo: string = 'Cliente'
  sexo!: any[];
  cities!: any[];
  loading: boolean = false;

  constructor(
    private authService: AutenticacaoUsuarioService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ){
      this.userForm = this.formBuilder.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cidade: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
      });
      this.sexo = [
        {tipo: 'MASCULINO'},
        {tipo: 'FEMININO'}
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
    this.loading = true;
    this.authService.retornaUsuarioLogado().pipe(
      mergeMap(userInfo => this.sharedService.getInfoById(
        userInfo['id'] as number, userInfo['tipo'] as string
      ))
    ).pipe(first(),finalize(()=> this.loading = false)).subscribe(
      (data:any) =>{
        this.user = data as GenericUser;
        this.setUserOnForm(this.user)
        this.userForm.disable()
      }
    )
  }

  setUserOnForm(userData: GenericUser){
    this.userForm.patchValue({
      nome: userData.nome,
      email: userData.email,
      cidade: userData.cidade,
      sexo: userData.sexo,
    })
  }

  formControlEnabled(){
    this.userForm.disabled ? this.userForm.enable() : this.userForm.disable();
  }

  saveChanges(){
    this.loading = true;
    if(this.userForm.valid){
      this.authService.retornaUsuarioLogado().pipe(
        mergeMap(userInfo => this.sharedService.attUser(
          this.userForm.getRawValue(), userInfo['tipo'] as string, this.user.id
          )
        )
      ).pipe(first(), finalize(()=> this.loading = false)).subscribe(
        () =>{
          this.showSuccess();
          this.userForm.disable();
        },
        () =>{
          this.showError();
        }
      )
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Dados atualizados com sucesso!'});
  }

  showError(){
    this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao atualizar dados!'});
  }

}
