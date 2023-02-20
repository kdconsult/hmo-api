import { Component, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '@auth/services/login.service';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly loading$ = this.loading.asObservable();
  private subscriptions: Subscription[] = [];

  emailForm: UntypedFormGroup = this.fb.group({
    email: new UntypedFormControl(
      null,
      Validators.compose([Validators.required, Validators.email])
    ),
  });

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private autService: LoginService,
    private snack: MatSnackBar,
    private fb: UntypedFormBuilder
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      this.snack.open('Полето "Имейл" не е коректно попълнено!', 'ОК', {
        duration: 5000,
      });

      return;
    }

    const email = this.emailForm.get('email')?.value;
    if (email === null) {
      this.snack.open('Полето "Имейл" не е коректно попълнено!', 'ОК', {
        duration: 5000,
      });

      return;
    }

    this.loading.next(true);

    this.subscriptions.push(
      this.autService
        .sendPassswordResetEmail(email)
        .pipe(tap(() => this.loading.next(false)))
        .subscribe({
          next: () => {
            this.dialogRef.close({
              success: true,
              email: this.emailForm.get('email')?.value,
            });
          },
          error: (error) => {
            this.snack.open(error.message, 'Разбрах');
            this.dialogRef.close({
              success: false,
              email: this.emailForm.get('email')?.value,
            });
          },
          complete: () =>
            this.snack.open(
              'На посочения имейл е изпратен линк за смяна на паролата.',
              'ОК'
            ),
        })
    );
  }
}
