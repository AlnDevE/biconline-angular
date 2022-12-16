import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';


@NgModule({
  declarations: [
    SolicitationsComponent
  ],
  imports: [
    CommonModule,
    SolicitationsRoutingModule
  ]
})
export class SolicitationsModule { }
