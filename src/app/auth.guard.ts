import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private _router: Router) { }

  canActivate(): boolean {
    if (!!localStorage.getItem('token')) {      
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
