import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelperComponent } from './helper.component';

const routes: Routes = [
  {
    path: '',
    component: HelperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelperRoutingModule { }
