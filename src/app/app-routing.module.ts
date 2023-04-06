import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/guard';
import { AuthGuardProvider } from './guards/role/role.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'home',
    canActivate: [AuthGuard, AuthGuardProvider],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./modules/helper/helper.module').then(m => m.HelperModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register-clients/register-clients.module').then(m => m.RegisterClientsModule)
  },
  {
    path: 'solicitations',
    loadChildren: () => import('./modules/solicitations/solicitations.module').then(m => m.SolicitationsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'configurations',
    loadChildren: () => import('./modules/configurations/configurations.module').then(m => m.ConfigurationsModule)
  },
  {
    path: 'view-provider/:id',
    loadChildren: () => import('./modules/view-provider/view-provider.module').then(m => m.ViewProviderModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'providers/:id/reports',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'providers/evaluate',
    loadChildren: () => import('./modules/evaluate/evaluate.module').then(m => m.EvaluateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
