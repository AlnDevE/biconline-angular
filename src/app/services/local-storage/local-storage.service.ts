import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUser(){
    let userToParse = localStorage.getItem('userinfo');
    return userToParse ? JSON.parse(userToParse) : undefined
  }
}
