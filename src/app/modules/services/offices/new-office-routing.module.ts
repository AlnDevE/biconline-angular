import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOfficeComponent } from './new-office.component';

const routes: Routes = [
  {
    path: '',
    component: NewOfficeComponent,
  },
  {
    path: ':id',
    component: NewOfficeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOfficeRoutingModule { }
