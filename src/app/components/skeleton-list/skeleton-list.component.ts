import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss']
})
export class SkeletonListComponent implements OnInit {

  @Input()
  quantity = [];

  constructor() { }

  ngOnInit(): void {
    for(let item=0; item<5; item++){

    }
  }

}
