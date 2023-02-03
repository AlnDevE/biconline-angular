import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  url = `${environment.apiURL}avaliacoes/clientes/`;

  constructor(private httpClient: HttpClient) { }

  postRating(clientId: any, providerId: any, rating: any){
    return this.httpClient.post(`${this.url}${clientId}/prestadores/${providerId}`, rating);
  }
}
