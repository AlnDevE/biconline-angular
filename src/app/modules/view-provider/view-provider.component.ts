import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, forkJoin } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss']
})
export class ViewProviderComponent implements OnInit {

  id!: any;
  provider!: Provider;
  coments: any;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    forkJoin({
      provider: this.prestadorService.findById(this.id),
      rating: this.prestadorService.getRating(this.id)
    }).subscribe(
      (responses: any) =>{
        this.provider = responses.provider as Provider;
        this.coments = responses.rating.data['content'];
      }
    )
  }

}
