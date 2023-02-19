import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cookieheaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    request = request.clone({
      withCredentials: true,
    });

    if (csrfToken !== null && !request.headers.has(cookieheaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieheaderName, csrfToken),
      });
    }

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap((event) => console.log(event)),
      catchError((error) => {
        console.log(error.message);
        if (error.status === 409) {
          // window.location.href = 'http://localhost:9000/app/n/';
          this.router.navigate(['dashboard']);
        }
        return of(error);
      })
    );
  }
}
