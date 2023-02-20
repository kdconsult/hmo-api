import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
// import { AuthService } from '../../services/auth.service';
// import { RegisterComponent } from '../../register/register.component';
// import { ConfirmEmailComponent } from '../../confirm-email/confirm-email.component';
import { FullWidthComponent } from './full-width.component';
// import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
// import { environment } from '../../../environments/environment';
// import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { LoginModule } from '../../login/login.module';
// import { HmoCommonModule } from 'common';
// import { HandleResetPasswordComponent } from '../../handle-reset-password/handle-reset-password.component';

@NgModule({
  declarations: [
    // ResetPasswordComponent,
    // RegisterComponent,
    // HandleResetPasswordComponent,
    // ConfirmEmailComponent,
    FullWidthComponent,
  ],
  imports: [
    CommonModule,
    // HmoCommonModule,
    ReactiveFormsModule,
    // MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    LoginModule,
    // RecaptchaV3Module,
  ],
  providers: [
    // AuthService,
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: environment.RECAPTCHA_V3_SITE_KEY,
    // },
  ],
})
export class FullWidthModule {}
