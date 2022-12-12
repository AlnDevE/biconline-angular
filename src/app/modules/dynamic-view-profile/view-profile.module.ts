import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicViewProfileComponent } from './dynamic-view-profile.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { ProfileDemo } from './profile-demo';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [DynamicViewProfileComponent, ProfileDemo],
  imports: [
    CommonModule,
    DynamicDialogModule,
		ToastModule,
    RatingModule,
    FormsModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    CalendarModule
  ],
  exports: [DynamicViewProfileComponent, ProfileDemo]
})
export class ViewProfileModule { }
