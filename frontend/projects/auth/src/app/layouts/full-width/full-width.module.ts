import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullWidthComponent } from './full-width.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../../login/login.module';



@NgModule({
  declarations: [
    FullWidthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule
  ],
})
export class FullWidthModule { }
