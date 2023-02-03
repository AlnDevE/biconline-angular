import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluateRoutingModule } from './evaluate-routing.module';
import { EvaluateComponent } from './evaluate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { SkeletonListModule } from 'src/app/components/skeleton-list/skeleton-list.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    EvaluateComponent
  ],
  imports: [
    CommonModule,
    EvaluateRoutingModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RatingModule,
    SkeletonListModule,
    ToastModule
  ]
})
export class EvaluateModule { }
