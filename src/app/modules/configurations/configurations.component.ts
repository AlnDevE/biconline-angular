import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userDecode';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  user!: UserInfo;

  constructor(private authService: AutenticacaoUsuarioService) { }

  ngOnInit(): void {
    this.authService.retornaUsuarioLogado().subscribe(
      (user:any) => {
        this.user = user as UserInfo;
      }
    )
  }

}
