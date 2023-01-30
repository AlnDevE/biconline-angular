import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from "primeng/skeleton";
import { SkeletonListComponent } from './skeleton-list.component';


@NgModule({
  declarations: [
    SkeletonListComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule
  ],
  exports: [SkeletonListComponent]
})
export class SkeletonListModule { }
