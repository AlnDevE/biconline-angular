import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ViewProfileModule } from '../dynamic-view-profile/view-profile.module';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ViewProfileModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
