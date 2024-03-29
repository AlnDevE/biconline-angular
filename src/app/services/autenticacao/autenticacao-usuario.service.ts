import { Injectable } from '@angular/core';

import  jwt_decode  from 'jwt-decode'
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from 'src/app/interfaces/token';
import { Usuario } from 'src/app/interfaces/usuario';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoUsuarioService {

  user: Usuario = {};

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJWT();
    }
  }

  private decodificaJWT(){
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.user = usuario;
    localStorage.setItem('userinfo', JSON.stringify(usuario))
    this.usuarioSubject.next(usuario);
  }

  retornaUsuarioLogado(){
    this.decodificaJWT();
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: Observable<Token>){
    token.subscribe(
      data => {
        this.tokenService.salvaToken(data['token']);
        this.decodificaJWT();
      }
    )
  }

  logout(){
    this.tokenService.removeToken();
    this.user = {};
    this.usuarioSubject.next({});
    localStorage.clear();
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }

  isProvider(){
    let userToParse = localStorage.getItem('userinfo');
    return userToParse ? (
      JSON.parse(userToParse)?.tipo == 'Prestador'
    ): false
  }

}
