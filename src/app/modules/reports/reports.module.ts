import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
