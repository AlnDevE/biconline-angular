import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize, first, map, mergeMap, pipe } from 'rxjs';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { UserExistsService } from 'src/app/functions/user-exists.service';
import { UserInfo } from 'src/app/interfaces/userDecode';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: GenericUser;
  userForm!: FormGroup;
  userInfo!: UserInfo;
  tipo: string = 'Cliente';
  filer!: File;
  sexo!: any[];
  cities!: any[];
  loading: boolean = false;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;

  constructor(
    private authService: AutenticacaoUsuarioService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userExists: UserExistsService
    ){
      this.sexo = [
        {tipo: 'MASCULINO'},
        {tipo: 'FEMININO'}
      ];
      this.cities = [
        {name: 'Mogi Mirim'},
        {name: 'Mogi Guaçu'},
        {name: 'Itapira'},
        {name: 'Estiva Gerbi'},
        {name: 'Engenheiro Coelho'},
        {name: 'Santo Antônio de Posse'}
    ];
    }

  ngOnInit(): void {
    this.userInfo = this.getUser();
    this.defineForm();
    this.loading = true;
    this.sharedService.getInfoById(this.userInfo.id, this.userInfo.tipo).pipe(
      first(),finalize(()=> this.loading = false)
    ).subscribe(
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
    if(this.userInfo.tipo == 'Prestador'){
      this.userForm.patchValue({telefone: userData.telefone})
    }
  }

  formControlEnabled(){
    this.userForm.disabled ? this.userForm.enable() : this.userForm.disable();
  }

  saveChanges(){
    this.loading = true;
    if(this.userInfo.tipo == 'Prestador'){
      this.onUpload();
    }
    if(this.userForm.valid){
      this.authService.retornaUsuarioLogado().pipe(
        mergeMap(userInfo => this.sharedService.attUser(
          this.userForm.getRawValue(), userInfo['tipo'] as string, this.user.id
          )
        )
      ).pipe(first()
      ).subscribe({
        next: () =>{
          this.showSuccess();
          this.loading = false;
          this.userForm.disable();
        },
        error: () => this.showError('Erro ao atualizar dados!')
      })
    }
    else{
      this.showError('Dados Inválidos');
      this.loading = false;
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Dados atualizados com sucesso!'});
  }

  showError(msg: string){
    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }

  defineForm(){
    if(this.userInfo.tipo == 'Cliente'){
      this.userForm = this.formBuilder.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required], [this.userExists.userExistsByEmailExcludingCurrent(this.userInfo.id)]],
        cidade: ['', [Validators.required]],
        sexo: ['', [Validators.required]]
      });
    }
    else{
      this.userForm = this.formBuilder.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required], [this.userExists.userExistsByEmailExcludingCurrent(this.userInfo.id)]],
        telefone: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        sexo: ['', [Validators.required]]
      });
    }
  }

  getUser(){
    let userToParse = localStorage.getItem('userinfo');
    return userToParse ? JSON.parse(userToParse) : undefined
  }

  onSelectFile(event:any){
    this.filer = <File>event.target.files[0];
  }

  onUpload(){
    var fileNameHashed = this.generateHashName(40, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.sharedService.uploadImage(this.userInfo.id, this.userInfo.tipo ,this.filer, fileNameHashed).subscribe(
      (event:any) =>{
        console.log(event)
      }
    );
  }

  generateHashName(length: number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
