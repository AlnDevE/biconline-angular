import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  user!: GenericUser;
  pathGetImages: String = `${environment.apiURL}prestadores/images/users/`;
  providerId: any;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.providerId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.sharedService.getInfoById(this.providerId, 'Prestador').pipe(
      first()
    ).subscribe({
      next: (provider: any) => this.user = provider as GenericUser
    })
  }
}
