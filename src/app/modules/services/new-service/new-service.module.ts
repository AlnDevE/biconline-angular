import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServiceRoutingModule } from './new-service-routing.module';
import { NewServiceComponent } from './new-service.component';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewServiceComponent
  ],
  imports: [
    CommonModule,
    NewServiceRoutingModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class NewServiceModule { }
