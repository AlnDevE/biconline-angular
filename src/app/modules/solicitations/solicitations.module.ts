import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from 'src/app/utils/date/custom.datepipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SolicitationsComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    SolicitationsRoutingModule,
    TableModule,
    FormsModule,
    ToastModule,
    RouterModule
  ],
  providers:[MessageService]
})
export class SolicitationsModule { }
