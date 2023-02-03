import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluateComponent } from './evaluate.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluateComponent,
  },
  {
    path: ':id',
    component: EvaluateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluateRoutingModule { }
