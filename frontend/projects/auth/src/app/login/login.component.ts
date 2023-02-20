import { Component, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private loginService: LoginService = inject(LoginService);
  private fb: UntypedFormBuilder = inject(UntypedFormBuilder);
  private router: Router = inject(Router);

  loginForm: UntypedFormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  /**
   * onSubmit
   */
  public onSubmit(): void {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['dashboard']);
        }
      });
  }

  /**
   * sendRequest
   */
  public sendRequest() {
    this.loginService.sendRequest();
  }
}
