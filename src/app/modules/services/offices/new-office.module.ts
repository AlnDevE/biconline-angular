import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';
import { TooltipModule } from 'primeng/tooltip';
import { NewOfficeComponent } from './new-office.component';
import { NewOfficeRoutingModule } from './new-office-routing.module';
import { ToastModule } from 'primeng/toast';
import { SkeletonListModule } from 'src/app/components/skeleton-list/skeleton-list.module';


@NgModule({
  declarations: [
    NewOfficeComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    NewOfficeRoutingModule,
    ReactiveFormsModule,
    MessagesFormModule,
    TooltipModule,
    ToastModule,
    SkeletonListModule
  ]
})
export class NewOfficeModule { }
