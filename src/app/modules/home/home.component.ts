import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  servicesProviders: any[] = [1,2,3,4,5,6];

  cities: any[] = [{name:'Mogi Mirim'}, {name:'Mogi Guaçu'}, {name:'Itapira'}];
  categories: any[] = [{name:'Encanador'}, {name:'Eletricista'}, {name:'Pintor'}];
  citySelected: any;
  categorySelected: any;
}
