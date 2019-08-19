import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppUserService } from '../services/app-user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _AppUserService: AppUserService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._AppUserService.currentUserBS.getValue() !== null) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
