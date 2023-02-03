import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {

  params!: any;
  idPrestador!: any;
  form!: FormGroup;
  userInfo!: UserInfo;

  constructor(
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
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
    this.ratingService.postRating(this.userInfo.id, this.params.idPrestador, this.form.value).pipe(
      first()
    ).subscribe({
      next: () => console.log('comentado')
    })
  }

}
