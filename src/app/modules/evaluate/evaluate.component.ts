import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
  providers: [MessageService]
})
export class EvaluateComponent implements OnInit {

  params!: any;
  idPrestador!: any;
  form!: FormGroup;
  userInfo!: UserInfo;
  loading: boolean = false;

  constructor(
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.idPrestador = this.route.snapshot.paramMap.get('idPrestador')
    this.params = this.idPrestador ? this.route.snapshot.params : undefined;
    this.form = this.formBuilder.group({
      comentario: ['',[Validators.required]],
      nota: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.userInfo = this.localStorageService.getUser();
  }

  send(){
    this.loading = true;
    this.ratingService.postRating(this.userInfo.id, this.params.idPrestador, this.form.value).pipe(
      first()
    ).subscribe({
      next: () => {
        this.showSuccess()
        this.timing('/solicitations')
      },
      error: (error: any) => this.showError(error.message)
    })
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Successo', detail:'Avaliação feita com sucesso!'});
  }

  showError(msg: string){
    this.messageService.add({severity:'error', summary:'Erro', detail: msg});
  }

  timing(url: string){
    setTimeout(() => {
      this.router.navigate([url])
    }, 1700);
  }

}
