import { Injectable } from '@angular/core';

const key = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  retornaToken(){
    return localStorage.getItem(key) ?? '';
  }

  salvaToken(token: string){
    localStorage.setItem(key, token);
  }

  removeToken(){
    localStorage.removeItem(key);
  }

  possuiToken(){
    return !!this.retornaToken();
  }
}
