import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterClientsRoutingModule } from './register-clients-routing.module';
import { RegisterClientsComponent } from './register-clients.component';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
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
    MessagesModule
  ]
})
export class RegisterClientsModule { }
