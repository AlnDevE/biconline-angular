import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/interfaces/provider';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  servicesProviders: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  showProfile(provider: Provider){
    alert(`showing ${provider.nome}`)
  }

}
