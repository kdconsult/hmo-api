import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { LoginService } from '../login/login.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule],
  providers: [LoginService],
})
export class DashboardModule {}
