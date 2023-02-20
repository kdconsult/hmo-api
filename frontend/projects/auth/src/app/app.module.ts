import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FullWidthModule } from './layouts/full-width/full-width.module';
import { LoginService } from './services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullWidthModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (ls: LoginService) => {
        return () => {
          return ls.checkUser();
        };
      },
      multi: true,
      deps: [LoginService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
