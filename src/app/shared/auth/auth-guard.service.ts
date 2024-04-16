import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.getToken()) {
      // this.router.navigate(['/accueil'], {queryParams: {returnUrl: state.url}});
      console.log('tttt');

      return true;
    } else {

      this.router.navigate(['/pages/login'], {queryParams: {returnUrl: state.url}});
      return false;

    }
  }
}
