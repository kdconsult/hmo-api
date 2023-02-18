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

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cookieheaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    request = request.clone({
      withCredentials: true,
      headers: request.headers.set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImF1ZCI6bnVsbCwiYXV0aF90aW1lIjoxNjc2NzI1NzAzLCJlbWFpbCI6ImJvZ29taWwua3J1c3RldkBrZGNvbnN1bHQuZXUiLCJleHAiOm51bGwsImh0dHBzOlwvXC9oYXN1cmEuaW9cL2p3dFwvY2xhaW1zIjp7ImFjdGl2ZSI6dHJ1ZSwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJtYW5hZ2VyIl0sIngtaGFzdXJhLWNvbXBhbnktaWQiOiIwMjAxZDUzNy02YmMzLTQ3Y2QtODNhYi04Yzg4ODA5Y2NjZWUiLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJtYW5hZ2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImQwYzg5MjIyLTZhMjUtNGU3OC05OGYwLWNkMGVmN2YwZjg0ZiIsIngtaGFzdXJhLWxvY2FsZSI6ImJnIiwibWFuYWdlciI6dHJ1ZX0sImlhdCI6MTY3NjcyNTcwMywiaXNzIjoic2VsZiIsIm5hbWUiOiJcdTA0MTFcdTA0M2VcdTA0MzNcdTA0M2VcdTA0M2NcdTA0MzhcdTA0M2IgeyggPyBzdWJzdHIoLCAwLCAxKS4nLicgOiAnJyl9IFx1MDQxYVx1MDQ0MFx1MDQ0YVx1MDQ0MVx1MDQ0Mlx1MDQzNVx1MDQzMiIsInN1YiI6ImQwYzg5MjIyLTZhMjUtNGU3OC05OGYwLWNkMGVmN2YwZjg0ZiIsInVzZXJfaWQiOiJkMGM4OTIyMi02YTI1LTRlNzgtOThmMC1jZDBlZjdmMGY4NGYifQ.3DeDTckl6tHLd4t9_scqK6D2CCgGL0zQi_rmcHjekWo'
      ),
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
          window.location.href = 'http://localhost:9000/app/n/';
        }
        return of(error);
      })
    );
  }
}
