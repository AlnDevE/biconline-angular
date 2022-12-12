import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrestadorService } from 'src/app/services/prestador/prestador.service';
import { ProfileDemo } from './profile-demo';

@Component({
  selector: 'app-dynamic-view-profile',
  templateUrl: './dynamic-view-profile.component.html',
  styleUrls: ['./dynamic-view-profile.component.scss']
  ,
  providers: [DialogService, MessageService]
})
export class DynamicViewProfileComponent implements OnInit {

  constructor(private prestadorService:PrestadorService, private dialogService: DialogService) { }

  @Input()
  prestador: any;

  ref: DynamicDialogRef = new DynamicDialogRef();

  ngOnInit(): void {
    this.ref = this.dialogService.open(ProfileDemo, {
      header: this.prestador.nome,
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      data: this.prestador
  });
    this.ref.onClose.subscribe(
      res =>{
        console.log(res)
        this.prestadorService.showProfile = false;
      }
  );
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

}
