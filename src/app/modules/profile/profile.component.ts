import { Component, OnInit } from '@angular/core';
import { mergeMap, pipe } from 'rxjs';
import { GenericUser } from 'src/app/interfaces/genericUser';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: GenericUser;

  constructor(private authService: AutenticacaoUsuarioService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.authService.retornaUsuarioLogado().pipe(
      mergeMap(userInfo => this.sharedService.getInfoById(
        userInfo['id'] as number, userInfo['tipo'] as string
      ))
    ).subscribe(
      (data:any) =>{
        this.user = data as GenericUser;
      }
    )
  }

}
