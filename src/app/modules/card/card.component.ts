import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/interfaces/provider';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  servicesProviders: any[] = [];

  prestadorView: any = {};

  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;

  constructor(public prestadorService: PrestadorService) { }

  ngOnInit(): void {
  }

  showProfile(provider: Provider){
    this.prestadorView = provider;
    this.prestadorService.showProfile = true;
  }

}
