import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http: HttpClient = inject(HttpClient);

  public login(email: string, password: string): Observable<any> {
    return this.http
      .get('//localhost/sanctum/csrf-cookie')
      .pipe(
        switchMap(() =>
          this.http.post('//localhost/login', { email, password })
        )
      );
  }

  public sendRequest(): void {
    this.http.get('//localhost/api/user').subscribe((res) => {
      console.log(res);
    });
  }
}
