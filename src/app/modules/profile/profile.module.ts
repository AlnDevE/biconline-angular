import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { MessagesFormModule } from 'src/app/components/messages/messages.module';
import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule,
    MessagesFormModule,
    FileUploadModule
  ],
  providers:[MessageService]
})
export class ProfileModule { }
