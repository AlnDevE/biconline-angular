import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfigurationsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    SelectButtonModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationsModule { }
