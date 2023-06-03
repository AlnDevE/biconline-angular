import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Search } from 'src/app/interfaces/search';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})


export class PrestadorService{
  url = environment.apiURL;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  showProfile: boolean = false;
  searchProviders(filters?: Search){
    if(filters){
      let params = new HttpParams();
      Object.entries(filters).forEach(([key,value]) => {
        if(value && value != ''){
          params = params.append(key, value);
        }
      })
      return this.httpClient.get<any[]>(this.url+'prestadores/filtered/',{params: params});
    }
    return this.httpClient.get<any[]>(this.url+'prestadores');
  }

  registerService(id: number, serviceForm: any){
    return this.httpClient.put(`${this.url}prestadores/${id}/servicos`,serviceForm)
  }

  findById(id: any):any{
    return this.httpClient.get<any>(this.url+'prestadores/'+id).pipe(take(1));
  }

  getRating(id: any):any{
    return this.httpClient.get<any>(this.url+'prestadores/'+id+'/avaliacoes').pipe(take(1));
  }

  getSolicitacoes(id: any): any{
    return this.httpClient.get<any>(this.url+'solicitacoes/prestadores/'+id).pipe(take(1));
  }

  sendSolicitation(form: any, idCliente: any, idPrestador: number){
    return this.httpClient.post(`${this.url}solicitacoes/${idCliente}/${idPrestador}`,
    {
      data: form['data'],
      descricao: form['descricao']
    })
  }

  uploadImage(image: File, id: any, fileName: string){
    const formData = new FormData();
    formData.append('file', image, fileName);
    return this.httpClient.post(`${this.url}prestadores/upload/${id}`, formData,{
      headers: {'Content-Type': 'file'}
    });
  }

  putAvailable(available: boolean, id: any){
    return this.httpClient.put(`${this.url}prestadores/${id}/disponibilidade`,{disponivel: available})
  }

  getServices(id: any){
    return this.httpClient.get<any>(`${this.url}prestadores/${id}/servicos`);
  }

  updateOffice(idOffice: any, office: any){
    return this.httpClient.put(`${this.url}servicos/${idOffice}`, office)
  }

  deleteOffice(idOffice: any){
    return this.httpClient.delete(`${this.url}servicos/${idOffice}`)
  }
}
