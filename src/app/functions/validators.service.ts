import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  urlApi: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  verifyUserExistsByEmail(email:string){
    return this.httpClient.get(`${this.urlApi}validators/email/${email}`)
  }

  verifyUserExistsByEmailExcludingCurrent(id: number, email:string){
    return this.httpClient.get(`${this.urlApi}validators/put/email/${id}/${email}`)
  }
}
