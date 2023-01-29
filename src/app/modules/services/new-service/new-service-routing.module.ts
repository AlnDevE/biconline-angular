import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewServiceComponent } from './new-service.component';

const routes: Routes = [
  {
    path: '',
    component: NewServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewServiceRoutingModule { }
