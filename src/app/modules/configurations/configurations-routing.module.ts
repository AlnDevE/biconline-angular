import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationsComponent
  },
  {
    path: 'changes-passwords',
    loadChildren: () => import('./change-pass/change-pass.module').then(m => m.ChangePassModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
