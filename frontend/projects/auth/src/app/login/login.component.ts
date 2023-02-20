import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResetPasswordComponent } from '@auth/reset-password/reset-password.component';

import { BehaviorSubject, of, Subscription, switchMap, throwError } from 'rxjs';
import { LoginService } from '@auth/services/login.service';
// import { Valido } from 'common';
import { ReCaptchaV3Service } from 'ng-recaptcha';
// import { environment } from '../../environments/environment';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: UntypedFormGroup = this.fb.group({});
  hide = true;

  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly loading$ = this.loading.asObservable();

  // private allowRegistrationForm: BehaviorSubject<boolean> = new BehaviorSubject(
  //   false,
  // );
  // public readonly allowRegistrationForm$ =
  //   this.allowRegistrationForm.asObservable();

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    // private valido: Valido,
    private fb: UntypedFormBuilder,
    private auth: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private recaptchaService: ReCaptchaV3Service
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscrition) => subscrition.unsubscribe());
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(60),
        ],
      ],
    });

    // this.allowRegistrationForm.next(environment.IS_DEMO);
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.next(true);

    const { email, password } = this.loginForm.value;

    this.subscriptions.push(
      this.recaptchaService
        .execute('login')
        .pipe(
          switchMap((token) => {
            if (token && token.length > 0) {
              return this.auth.login(email, password);
            }
            return throwError(() => {
              const error: any = new Error('Invalid token');
              error.timestamp = Date.now();
              return error;
            });
          })
        )
        .subscribe({
          next: () => this.loading.next(false),
          error: ({ error }) => {
            console.log(error);
            this.loading.next(false);
            this.snackBar.open(
              error?.message ? error.message : error,
              'Затвори'
            );
          },
          complete: () => {
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 1000);

            this.snackBar.open('Успешен вход в системата', 'Разбрах', {
              duration: 3500,
            });
          },
        })
    );
  }

  resetPassword(): void {
    const config: MatDialogConfig = {
      minWidth: '350px',
    };

    this.subscriptions.push(
      this.recaptchaService
        .execute('resetPassword')
        .pipe(
          switchMap((token) => {
            if (token && token.length > 0) {
              this.dialog.open(ResetPasswordComponent, config);
              return of(null);
            }
            return throwError(() => {
              const error: any = new Error('Invalid token');
              error.timestamp = Date.now();
              return error;
            });
          })
        )
        .subscribe({
          error: (error) => {
            console.log(error);
          },
        })
    );
  }
}
