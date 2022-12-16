import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from 'src/app/utils/date/custom.datepipe';


@NgModule({
  declarations: [
    SolicitationsComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    SolicitationsRoutingModule,
    TableModule,
    FormsModule
  ]
})
export class SolicitationsModule { }
