import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, mergeMap } from 'rxjs';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { AutenticacaoService } from 'src/app/services/autenticacao/autenticacao.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TokenService } from 'src/app/services/token/token.service';
import { EventEmitterService } from 'src/app/utils/eventEmitter/event-emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  senha: string = '';

  constructor(private authService: AutenticacaoService,
     public tokenService: TokenService,
     private authUsuarioService: AutenticacaoUsuarioService,
     private router: Router,
     private sharedService: SharedService,
     private event: EventEmitterService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.realizaLogin(this.usuario,this.senha).subscribe(
      (data:any) => {
        this.tokenService.salvaToken(data['token']);
        this.setInfoOnLocalStorage();
        this.router.navigate(['/home']);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  setInfoOnLocalStorage(){
    this.authUsuarioService.retornaUsuarioLogado().pipe(
      mergeMap((user:any) => this.sharedService.getInfoById(user['id'],user['tipo'])),
      first()
    ).subscribe(
      (user: any)=>{
        localStorage.setItem('user', JSON.stringify(user))
        this.event.get('user').emit()
      }
    )
  }
}
