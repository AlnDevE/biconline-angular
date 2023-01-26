import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';


@NgModule({
  declarations: [
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    ReactiveFormsModule,
    MessagesFormModule
  ]
})
export class ChangePassModule { }
