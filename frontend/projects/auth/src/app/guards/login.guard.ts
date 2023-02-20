import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoginService } from '@auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private loginService: LoginService = inject(LoginService);
  private router: Router = inject(Router);

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginService.user.asObservable().pipe(
      tap((res) => res && this.router.navigate(['dashboard'])),
      map((res) => !res)
    );
  }
}
