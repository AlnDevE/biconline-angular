import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.getCategories;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getCategories(): any{
    return this.httpClient.get<any>(this.url);
  }

}


