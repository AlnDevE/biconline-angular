import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url= environment.apiURL;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }

  registerUser(userForm: any ): any{
    return this.httpClient.post<any>(this.url+'clientes',{
      nome: userForm['nome'],
      email: userForm['email'],
      senha: userForm['senha'],
      cidade: userForm['cidade'],
      sexo: userForm['sexo']
    });
  }

  registerProvider(userForm: any): any{
    return this.httpClient.post<any>(this.url+'prestadores',{
      nome: userForm['nome'],
      email: userForm['email'],
      senha: userForm['senha'],
      cidade: userForm['cidade'],
      sexo: userForm['sexo'],
      telefone: userForm['telefone']
    });
  }

  findById(id: any):any{
    return this.httpClient.get<any>(this.url+'prestadores/'+id).pipe(take(1));
  }

  getInfoClienteById(id: number){
    return this.httpClient.get<any>(`${this.url}clientes/${id}`).pipe(take(1));
  }

  putInfoClienteById(dados: any){
    return this.httpClient.put<any>(`${this.url}clientes/${dados['id']}`, {
      nome: dados['nome'],
      email: dados['email'],
      cidade: dados['cidade'],
      sexo: dados['sexo'],
      senha: '1234'
    })
  }

  getSolicitacoes(id: any): any{
    return this.httpClient.get<any>(this.url+'solicitacoes/clientes/'+id).pipe(take(1));
  }
}
