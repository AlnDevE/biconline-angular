import { Component, OnInit } from '@angular/core';
import { HelpersText } from 'src/app/data/helpData';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {

  helpList: any[] = HelpersText

  constructor() { }

  ngOnInit(): void {
  }

}
