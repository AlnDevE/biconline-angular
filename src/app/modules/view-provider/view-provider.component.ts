import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { getRatingMessages } from 'src/app/functions/ratingMessages';
import { Provider } from 'src/app/interfaces/provider';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss'],
  providers: [MessageService]
})
export class ViewProviderComponent implements OnInit {

  id!: any;
  provider!: Provider;
  coments!: any[];
  rating: number = 0;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;
  sendSolicitation: boolean = false;
  formSolicitation!: FormGroup;
  ratingMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.buildForm();
    this.id = this.route.snapshot.paramMap.get('id');
    forkJoin({
      provider: this.prestadorService.findById(this.id),
      rating: this.prestadorService.getRating(this.id)
    }).subscribe(
      (responses: any) =>{
        this.provider = responses.provider as Provider;
        this.coments = responses.rating.avaliacoes;
        this.rating = responses.rating.mediaNota;
        this.ratingMessage = getRatingMessages(this.rating);
      }
    )
  }

  buildForm(){
    this.formSolicitation = this.formBuilder.group({
      data: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  onChange(){
    this.sendSolicitation = this.formSolicitation.valid;
  }

  onSubmit(){
    if(this.formSolicitation.valid){
      this.prestadorService.sendSolicitation(this.formSolicitation.value, this.provider.id).subscribe(
        res => {
          this.showSuccess();
        }
      )
    }
  }

  showSuccess(){
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Solicitação enviada com sucesso!'})
  }

  showError(){
    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Solicitação'})
  }


}
