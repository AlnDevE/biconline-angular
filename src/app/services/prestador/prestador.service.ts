import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})


export class PrestadorService implements OnInit{

  url = environment.apiURL;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }

  showProfile: boolean = false;

  ngOnInit(): void {

  }

  pesquisaPrestadores(tipoServico: string, filters:any ):any{
   let params = new HttpParams().set('search', filters['search']).set('cidade', filters['cidade']).set('categoria', filters['categoria']);
   return this.httpClient.get<any[]>(this.url+'prestadores/filtered/',{params: params});
  }

  listaPrestadores(){
    return this.httpClient.get<any[]>(this.url+'prestadores');
  }

  cadastroServico(userForm: any){
    return this.httpClient.put(this.url+'prestadores/'+userForm['id']+'/servicos',
    {
      descricao: userForm['descricao'],
      categoria: userForm['categoria']
    })
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

  sendSolicitation(form: any, idPrestador: number){
    return this.httpClient.post(`${this.url}solicitacoes/1/${idPrestador}`,
    {
      data: form['data'],
      descricao: form['descricao']
    })
  }
}
