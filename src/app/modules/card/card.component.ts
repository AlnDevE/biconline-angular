import { Component, Input, OnInit } from '@angular/core';

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

  showProfile(provider: any){
    alert(`showing ${provider}`)
  }

}
