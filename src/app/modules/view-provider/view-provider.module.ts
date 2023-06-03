import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProviderRoutingModule } from './view-provider-routing.module';
import { ViewProviderComponent } from './view-provider.component';
import { RatingModule } from 'primeng/rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ViewProviderComponent
  ],
  imports: [
    CommonModule,
    ViewProviderRoutingModule,
    RatingModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    TooltipModule,
    ProgressSpinnerModule
  ]
})
export class ViewProviderModule { }
