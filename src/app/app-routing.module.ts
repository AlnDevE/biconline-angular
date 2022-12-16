import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'help',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/helper/helper.module').then(m => m.HelperModule)
  },
  {
    path: 'start',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule)
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/register-clients/register-clients.module').then(m => m.RegisterClientsModule)
  },
  {
    path: 'solicitations',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/solicitations/solicitations.module').then(m => m.SolicitationsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
