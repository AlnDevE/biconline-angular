import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { EventEmitterService } from 'src/app/utils/event-emitter.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  serviceDescription: any = new FormControl('');

  constructor(public tokenService:TokenService, private router: Router, private event: EventEmitterService) { }

  ngOnInit(): void {
  }

  logout():void{
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  searchChange(){
    this.event.get('search').emit(this.serviceDescription?.value);
  }
}
