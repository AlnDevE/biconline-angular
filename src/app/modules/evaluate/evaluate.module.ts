import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluateRoutingModule } from './evaluate-routing.module';
import { EvaluateComponent } from './evaluate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    EvaluateComponent
  ],
  imports: [
    CommonModule,
    EvaluateRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RatingModule
  ]
})
export class EvaluateModule { }
