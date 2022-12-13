import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import { HelperRoutingModule } from './helper-routing.module';
import { HelperComponent } from './helper.component';


@NgModule({
  declarations: [
    HelperComponent
  ],
  imports: [
    CommonModule,
    HelperRoutingModule,
    AccordionModule
  ]
})
export class HelperModule { }
