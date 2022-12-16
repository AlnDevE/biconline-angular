import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm } from 'src/app/interfaces/newUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  registerUser(userForm: UserForm, type: string){
    return this.httpClient.post(`${this.apiUrl}${type}`, userForm)
  }
}
