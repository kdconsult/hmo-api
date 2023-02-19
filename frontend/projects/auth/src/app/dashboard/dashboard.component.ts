import { Component, inject } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private loginService: LoginService = inject(LoginService);
  /**
   * logout
   */
  public logout() {
    this.loginService.logout();
  }
}
