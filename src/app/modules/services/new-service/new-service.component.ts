import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { CategoryService } from 'src/app/services/category/category.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {

  categories!: Category[];
  form!: FormGroup;
  user!: UserInfo;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private providerService: PrestadorService
  ) {
    this.setForm();
    this.user = this.localStorageService.getUser();
  }

  ngOnInit(): void {
    this.getCategories();
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
      descricao: ['', Validators.required]
    })
  }

  register(){
    console.log(this.form.value)
    if(this.form.invalid){
      return
    }
    this.providerService.registerService(
      this.user.id,
      {
        categoria: this.form.get('categoria')?.value?.nome,
        descricao: this.form.get('descricao')?.value
      }
      ).pipe(
      first()
    ).subscribe();
  }
}
