import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { versions } from '../../../../../../versions';

const APP_NAME = environment.APP_NAME;

@Component({
  selector: 'auth-full-width',
  templateUrl: './full-width.component.html',
  styleUrls: ['./full-width.component.scss'],
})
export class FullWidthComponent implements OnInit {
  appName = APP_NAME;
  appVersion: string = '1.0.0';
  appRevision: string = '1.0.0';
  constructor() {
    // this.appVersion = versions.version;
    // this.appRevision = versions.revision;
  }

  ngOnInit(): void {}
}
