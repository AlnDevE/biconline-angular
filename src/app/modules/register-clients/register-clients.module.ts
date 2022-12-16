import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterClientsRoutingModule } from './register-clients-routing.module';
import { RegisterClientsComponent } from './register-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
  declarations: [
    RegisterClientsComponent
  ],
  imports: [
    CommonModule,
    RegisterClientsRoutingModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    MessagesFormModule

  ]
})
export class RegisterClientsModule { }
