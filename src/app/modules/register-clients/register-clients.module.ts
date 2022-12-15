import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterClientsRoutingModule } from './register-clients-routing.module';
import { RegisterClientsComponent } from './register-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { MessagesModule } from 'src/app/components/messages/messages.module';


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
    MessagesModule
  ]
})
export class RegisterClientsModule { }
