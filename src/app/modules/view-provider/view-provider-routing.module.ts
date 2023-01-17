import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProviderComponent } from './view-provider.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProviderRoutingModule { }
