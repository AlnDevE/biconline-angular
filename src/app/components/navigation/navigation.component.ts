import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { TokenService } from 'src/app/services/token/token.service';
import { EventEmitterService } from 'src/app/utils/eventEmitter/event-emitter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  serviceDescription: any = new FormControl('');
  user!: any;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;
  typeOfUser: string = "Cliente";

  constructor(public tokenService:TokenService, private router: Router, private event: EventEmitterService) {
    this.event.get('user').subscribe(
      () =>{
        this.getUserLocalStorage();
      }
    )
  }

  ngOnInit(): void {
    if(this.tokenService.possuiToken()){
      this.getUserLocalStorage();
    }
  }

  logout():void{
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  searchChange(){
    this.router.navigate(['home'], {queryParams: {search:  this.serviceDescription?.value}})
  }

  getUserLocalStorage(){
    let userToParse = localStorage.getItem('user');
    this.user = userToParse ? JSON.parse(userToParse) : undefined;
    userToParse = localStorage.getItem('userinfo');
    this.typeOfUser = userToParse ? (
      JSON.parse(userToParse)?.tipo
    ): undefined;
  }
}
