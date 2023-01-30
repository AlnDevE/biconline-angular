import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { CategoryService } from 'src/app/services/category/category.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';

@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.scss'],
  providers: [MessageService]
})
export class NewOfficeComponent implements OnInit {

  categories!: Category[];
  form!: FormGroup;
  user!: UserInfo;
  description: string = 'Descreva o serviço usando palavras chaves, por ex: Limpeza de...';
  loading: boolean = false;
  id: any;
  params: any;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private providerService: PrestadorService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.setForm();
    this.user = this.localStorageService.getUser();
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getCategories();
    this.params = this.id ? this.route.snapshot.params : undefined;
    if(this.params) this.setParamsValue();
  }

  getCategories(){
    this.categoryService.getCategories().pipe(
      first()
    ).subscribe(
      (data:any) =>{
        this.categories = data?.content;
      }
    )
  }

  setForm(){
    this.form = this.formBuilder.group({
      categoria: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]]
    })
  }

  register(){
    console.log(this.form.value)
    if(this.form.invalid){
      return
    }
    this.providerService.registerService(
      this.user.id,
      this.form.value
      ).pipe(
      first()
    ).subscribe({
      next: () => {
        this.showSuccess('Serviço cadastrado com sucesso!');
        this.loading = true;
        this.timing('/services');
      },
      error: () => this.showError('Erro ao cadastrar serviço!')
    });
  }

  setParamsValue(){
    this.form.get('categoria')?.setValue(this.params.categoria)
    this.form.get('descricao')?.patchValue(this.params.descricao)
  }

  updateOffice(){
    this.providerService.updateOffice(this.id, this.form.value).pipe(
      first()
    ).subscribe({
      next: () => {
        this.showSuccess('Informações atualizadas!');
        this.loading = true;
        this.timing('/services');
      },
      error: () => this.showError('Erro ao atualizar informações!')
    });
  }

  showSuccess(msg: string){
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: msg})
  }

  showError(msg: string){
    this.messageService.add({severity: 'error', summary: 'Erro', detail: msg})
  }

  timing(url: string){
    setTimeout(() => {
      this.router.navigate([url])
    }, 2500);
  }
}
