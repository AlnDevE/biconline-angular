import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SkeletonListModule } from 'src/app/components/skeleton-list/skeleton-list.module';

@NgModule({
  declarations: [
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    RouterModule,
    ToastModule,
    SkeletonListModule
  ]
})
export class ServicesModule { }
