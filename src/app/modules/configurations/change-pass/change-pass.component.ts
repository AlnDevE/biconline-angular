import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  providers: [MessageService]
})
export class ChangePassComponent implements OnInit {

  form!: FormGroup;
  user!: UserInfo;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.user = this.localStorageService.getUser();
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.form = this.formBuilder.group({
      old: ['',[Validators.required]],
      current: ['', [Validators.required]],
      currentReplicate: ['',[Validators.required]]
    })
  }

  onSaveChanges(){
    if(this.verifyPassword()){
      this.form.get('current')?.setErrors({'nomatch': true})
      this.form.get('currentReplicate')?.setErrors({'nomatch': true})
      return
    }
    if(this.form.valid){
      this.setPassword();
    }

  }

  verifyPassword(){
    return this.form.get('current')?.value != this.form.get('currentReplicate')?.value;
  }

  setPassword(){
    this.loading = true;
    this.sharedService.changePassword(this.user.id, this.user.tipo, this.form.value).pipe(
      first()
    ).subscribe({
      next: () => {
        this.timing('/configurations');
        this.showSuccess();
      },
      error: (error: any) => {
        this.showError(error?.error?.message);
        this.loading = false;
        this.form.get('old')?.setErrors({'nomatch': true})
      }
    })
  }

  timing(url: string){
    setTimeout(() => {
      this.router.navigate([url])
    }, 1700);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Senha atualizada com sucesso!'});
  }

  showError(msg: string){
    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }


}
