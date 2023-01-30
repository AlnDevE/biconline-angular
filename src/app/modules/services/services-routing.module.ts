import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent
  },{
    path:'offices',
    loadChildren: () => import('./offices/new-office.module').then(m => m.NewOfficeModule)
  },
  {
    path:'offices/:id',
    loadChildren: () => import('./offices/new-office.module').then(m => m.NewOfficeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
