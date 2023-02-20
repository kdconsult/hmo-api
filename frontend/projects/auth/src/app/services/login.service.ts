import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http: HttpClient = inject(HttpClient);

  public user: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public login(email: string, password: string): Observable<any> {
    return this.http.get('//localhost/sanctum/csrf-cookie').pipe(
      switchMap(() => this.http.post('//localhost/login', { email, password })),
      switchMap((res) => {
        console.log(res);
        let usr = true;

        this.user.next(usr);
        return of(usr);
      }),
      catchError((err) => {
        console.log(err);
        this.user.next(false);
        return of(false);
      })
    );
  }

  /**
   * checkUser
   */
  public checkUser() {
    return this.http.get('http://localhost/api/user').pipe(
      map((_res) => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      }),
      tap((res) => this.user.next(res))
    );
  }

  /**
   * logout
   */
  public logout() {
    this.http.post('//localhost/logout', {}).subscribe((res) => {
      this.user.next(false);
      window.location.href = '/auth/login';
    });
  }

  public sendRequest(): void {
    this.http.get('//localhost/api/user').subscribe((res) => {
      console.log(res);
    });
  }
}
