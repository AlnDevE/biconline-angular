import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoUsuarioService } from 'src/app/services/autenticacao/autenticacao-usuario.service';
import { AutenticacaoService } from 'src/app/services/autenticacao/autenticacao.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  senha: string = '';

  constructor(private authService: AutenticacaoService,
     public tokenService: TokenService, private authUsuarioService: AutenticacaoUsuarioService,
     private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.realizaLogin(this.usuario,this.senha).subscribe(
      (data:any) => {
        this.tokenService.salvaToken(data['token']);
        this.router.navigate(['/home'])
      },
      (error:any) => {
        console.log(error);
      }
    )
  }
}
