import {Component} from '@angular/core';
import { MessageService } from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';

@Component({
    styleUrls: ['./dynamic-view-profile.component.scss'],
    template: `
        <p-toast></p-toast>
        <p-progressSpinner *ngIf="!isLoaded" [style]="{display:'flex', justifycontent:'center', width:'50px', height: '50px'}"></p-progressSpinner>
        <div *ngIf="step == 'view' ; else request">
          <div *ngIf="isLoaded" class="container">
            <div class="rating">
              <img src="../../../assets/img/user_tests/renato_user.jpg"
              width="250px" height="350px" alt="Imagem de perfil">
              <p-rating class="stars" [ngModel]="rating" [readonly]="true" [stars]="5" [cancel]="false"></p-rating>
            </div>
            <div class="infos">
              <h5>Cidade {{prestador.cidade}}</h5>
              <h5>Telefone {{prestador.telefone}}</h5>
              <h5>Categorias:{{categories}} </h5>
              <h5>Descricao :{{prestador.descricaoServicoPrincipal}}</h5>
            </div>
            <div *ngIf="coments.length > 0">
                  <div style="margin-left: 2rem;">
                    <h4>Comentários</h4>
                  </div>
                  <div></div>
                  <div *ngFor="let coment of coments">
                    <span style="margin: 2rem; margin-left: 50px;"><b>{{coment.nomeCliente}}</b></span><br>
                    <span class="margin-coments"> {{coment.comentario}}</span><span>{{coment.data}}</span>
                  </div>
            </div>
          </div>
          <div class="botao">
            <button type="button" class="btn btn-primary btn-lg" (click)="nextStep()">Solicitar</button>
          </div>
        </div>
        <ng-template #request>
          <div class="input">
            <div class="inputDate">
              <label for="inputData">Selecione uma data</label>
              <p-calendar [inputStyle]="{'width':'350px', 'height':'10px'}" id="inputData" [(ngModel)]="dateSelected" [inline]="true" [showWeek]="true"></p-calendar>
            </div>
            <div class="inputDescription">
              <label for="inputDescricao">Digite a descrição do serviço</label>
              <textarea id="inputDescricao" rows="5" cols="60" [(ngModel)]="description" pInputTextarea [autoResize]="true"></textarea>
            </div>
          </div>
          <div class="buttonsend">
            <button type="button" class="btn btn-primary btn-lg" (click)="sendRequestConfirm()">Enviar</button>
          </div>
        </ng-template>
    `,
    providers: [MessageService]
})
export class ProfileDemo {

    rating: number = 3;
    prestador: any;
    categories: any;
    coments: any = [];

    isLoaded: boolean = false;

    step: string = 'view';

    dateSelected: any;
    description: any;


    constructor(private prestadorService: PrestadorService, public ref: DynamicDialogRef, public config: DynamicDialogConfig,
      private messageService: MessageService) { }

    ngOnInit() {
      this.isLoaded = false;
      this.step = 'view';
      this.prestadorService.findById(this.config.data.id).subscribe(
        (data:any)=>{
          this.prestador=data;
          if(this.prestador['servico']){
            for (let i of this.prestador['servico']) {
              if(i['categoria']['nome']){
                this.categories += ` ${i['categoria']['nome'] ? i['categoria']['nome']: ''}`;
              }
            }
            this.prestador['descricaoServicoPrincipal'] = this.prestador['servico'][0]['descricao'];
          }
          this.isLoaded = true;
        },
        (error:any) =>{
          console.log(error);
        }
      )
      this.prestadorService.getRating(this.config.data.id).subscribe(
        (data:any) =>{
          this.coments = data['content'];
          console.log(this.coments);
        }
      )
    }

    nextStep(){
      this.config.header = 'Preencha os Campos Abaixo'
      this.step = 'request';
    }

    sendRequestConfirm(){
      let form = {
        'data': this.dateSelected,
        'descricao': this.description
      }
      this.prestadorService.sendSolicitation(form, this.prestador.id).subscribe(
        res => {
          this.showSuccess();
          this.ref.close();
        }
      )
    }

    showSuccess(){
      this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Solicitação enviada com sucesso!'})
    }

    showError(){
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Solicitação'})
    }
}
