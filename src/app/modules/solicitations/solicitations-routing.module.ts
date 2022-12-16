import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitationsComponent } from './solicitations.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitationsRoutingModule { }
