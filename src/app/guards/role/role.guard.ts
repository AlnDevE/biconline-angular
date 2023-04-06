import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoUsuarioService } from '../../services/autenticacao/autenticacao-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProvider implements CanActivate{

  constructor(private authService: AutenticacaoUsuarioService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(!this.authService.isProvider()){
      return true;
    }

    this.router.navigate(['/start']);
    return false;
  }


}
