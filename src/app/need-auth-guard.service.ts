import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { LoginService } from './login.service';


@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
