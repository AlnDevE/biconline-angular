import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoUsuarioService } from './autenticacao-usuario.service';
import { Token } from 'src/app/interfaces/token'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  usuario: string = '';
  senha: string = '';
  url = environment.apiURL;

  constructor(private httpClient: HttpClient, private usuarioService: AutenticacaoUsuarioService) { }

  realizaLogin(usuario: string, senha:string): any {
    const token = this.httpClient.post(this.url+'auth',{
      email: usuario,
      senha: senha
    })
    this.usuarioService.salvaToken(token as Observable<Token>);
    return token;

  }

}
