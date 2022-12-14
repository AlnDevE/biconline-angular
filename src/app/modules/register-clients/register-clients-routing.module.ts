import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterClientsComponent } from './register-clients.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterClientsRoutingModule { }
