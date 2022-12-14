import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.scss']
})
export class RegisterClientsComponent implements OnInit {

  tab: string  = 'cliente';
  sexo: any[];
  cities: any[];
  sexoSelected: any = undefined;
  citySelected: any = undefined;

  nome: string ='';
  email: string ='';
  telefone: string ='';
  senha: string = '';
  cidade: string = '';
  sexoText: string = '';

  msgs1: Message[] = [];

  constructor() {
    this.sexo = [
      {tipo: 'Masculino'},
      {tipo: 'Feminino'}
    ];
    this.cities = [
      {name: 'Mogi Mirim'},
      {name: 'Mogi Guaçu'},
      {name: 'Itapira'},
      {name: 'Arthur Nogueira'},
      {name: 'Limeira'}
  ];
  }

  ngOnInit(): void {
  }

  onRegister(){
    console.log("Teste")
  }

  changeTab(){
    console.log("t")
  }
}
