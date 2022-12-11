import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Provider } from 'src/app/interfaces/provider';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities: any = [];
  categories: any[] = [];
  categorySelected: any;
  citySelected: any;

  servicesProviders: Provider[] = [];

  constructor(public tokenService: TokenService, public router: Router,
    public prestadorService: PrestadorService, private categoryService: CategoryService,
    private clienteService: ClienteService, private usuarioService: AutenticacaoUsuarioService) {

      this.cities = [
        {name: 'Mogi Mirim'},
        {name: 'Mogi Guaçu'},
        {name: 'Itapira'},
        {name: 'Arthur Nogueira'},
        {name: 'Limeira'}
    ];

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any) =>{
        this.categories = data?.content;
      }
    )

  }

  getAllProviders(){
    this.prestadorService.listaPrestadores().subscribe(
      data => {
        this.treatListProviders(data)
      }
    )
  }

  treatListProviders(data: any){
    this.servicesProviders.length = 0;
    this.servicesProviders = data?.content ? data.content : undefined;
  }
}
