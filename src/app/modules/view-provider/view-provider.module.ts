import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProviderRoutingModule } from './view-provider-routing.module';
import { ViewProviderComponent } from './view-provider.component';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    ViewProviderComponent
  ],
  imports: [
    CommonModule,
    ViewProviderRoutingModule,
    RatingModule
  ]
})
export class ViewProviderModule { }
