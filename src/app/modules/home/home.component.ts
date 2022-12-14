import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Provider } from 'src/app/interfaces/provider';
import { Search } from 'src/app/interfaces/search';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { TokenService } from 'src/app/services/token/token.service';
import { EventEmitterService } from 'src/app/utils/event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  cities: any = [];
  categories: any[] = [];
  categorySelected: any;
  citySelected: any;
  serviceSearch: any;
  subs: any;

  servicesProviders: Provider[] = [];

  constructor(public tokenService: TokenService, public router: Router,
    public prestadorService: PrestadorService, private categoryService: CategoryService,
    private clienteService: ClienteService, private usuarioService: AutenticacaoUsuarioService,
    private event: EventEmitterService, private route: ActivatedRoute) {

      this.cities = [
        {nome: 'Mogi Mirim'},
        {nome: 'Mogi Guaçu'},
        {nome: 'Itapira'},
        {nome: 'Arthur Nogueira'},
        {nome: 'Limeira'}
    ];

    this.route.queryParams.subscribe(
      (params: Params)=>{
        if(params){
          this.serviceSearch = params['search'] ? params['search'] : undefined;
          this.getFilteredProviders();
        }
        else{
          this.getAllProviders();
        }
      }
    )
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any) =>{
        this.categories = data?.content;
      }
    )
  }

  getAllProviders(){
    this.prestadorService.searchProviders().subscribe(
      data => {
        this.treatListProviders(data)
      }
    )
  }

  treatListProviders(data: any){
    this.servicesProviders.length = 0;
    this.servicesProviders = data?.content ? data.content : undefined;
  }

  getFilteredProviders(){
    let filters: Search = {};
    filters.cidade = this.citySelected?.nome ? this.citySelected?.nome : undefined;
    filters.categoria = this.categorySelected?.nome ? this.categorySelected?.nome : undefined;
    filters.search = this.serviceSearch ? this.serviceSearch : undefined;
    this.prestadorService.searchProviders(filters).subscribe(
      (response:any) => {
        this.treatListProviders(response)
      }
    )
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }

  }
}
