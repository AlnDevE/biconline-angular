import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';
import { ToastModule } from 'primeng/toast';
import { SkeletonListModule } from 'src/app/components/skeleton-list/skeleton-list.module';


@NgModule({
  declarations: [
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    ReactiveFormsModule,
    MessagesFormModule,
    ToastModule,
    SkeletonListModule
  ]
})
export class ChangePassModule { }
