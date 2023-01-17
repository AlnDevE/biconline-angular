import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ViewProfileModule } from '../dynamic-view-profile/view-profile.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ViewProfileModule,
    RouterModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
