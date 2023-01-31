import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForm } from 'src/app/interfaces/newUser';
import { Solicitation } from 'src/app/interfaces/solicitation';
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

  attUser(userForm: any, type: string,  id: Number){
    return this.httpClient.patch(`${this.apiUrl}${this.getTypeUrl(type)}s/${id}`, userForm)
  }

  get_solicitations(id: number, type: string){
    return this.httpClient.get(`${this.apiUrl}solicitacoes/${type}/${id}`)
  }

  getInfoById(id: number, type: string){
    return this.httpClient.get(
      `${this.apiUrl}${this.getTypeUrl(type)}s/${id}`)
  }

  getTypeUrl(type:string){
    return type == 'Cliente' ? type.toLocaleLowerCase() : `${type.toLocaleLowerCase()}e`
  }

  uploadImage(id: any, type: string, image: File, fileName: string){
    const formData = new FormData();
    formData.append('file', image, fileName);
    return this.httpClient.post(`${this.apiUrl}${this.getTypeUrl(type)}s/upload/${id}`, formData,{
      headers: {'Content-Type': 'file'}
    });
  }

  putSolicitations(id: any, solicitation: Solicitation){
    return this.httpClient.put(`${this.apiUrl}solicitacoes/update/${solicitation.id}/${id}`,{
      'descricao': solicitation.descricao,
      'status': solicitation.status,
      'data': solicitation.data
    })
  }

  changePassword(id: any, type: any, passwordForm: any){
    return this.httpClient.put(`${this.apiUrl}${this.getTypeUrl(type)}s/${id}/passwords`, passwordForm);
  }
}
