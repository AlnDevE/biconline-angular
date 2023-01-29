import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServiceRoutingModule } from './new-service-routing.module';
import { NewServiceComponent } from './new-service.component';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';


@NgModule({
  declarations: [
    NewServiceComponent
  ],
  imports: [
    CommonModule,
    NewServiceRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    MessagesFormModule
  ]
})
export class NewServiceModule { }
