import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
// import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
// import { RegistrationGuard } from './guards/registration.guard';
// import { HandleResetPasswordComponent } from './handle-reset-password/handle-reset-password.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: FullWidthComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      //   {
      //     path: 'register',
      //     component: RegisterComponent,
      //     canActivate: [RegistrationGuard],
      //   },
      //   { path: 'confirm-email', component: ConfirmEmailComponent },
      //   { path: 'reset-password', component: HandleResetPasswordComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
