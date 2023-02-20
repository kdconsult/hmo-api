import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'projects/software/src/environments/environment';

import { FullWidthComponent } from './full-width.component';

describe('FullWidthComponent', () => {
  let component: FullWidthComponent;
  let fixture: ComponentFixture<FullWidthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullWidthComponent],
      imports: [RouterTestingModule, MatToolbarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get name from env and the name in dev should be Hyper M Dev', () => {
    const appName = environment.softwareName;
    const appNmaeByHand = 'Hyper M Dev';

    expect(appName).toBe(appNmaeByHand);
    expect(component.appName).toBe(appNmaeByHand);
  });
});
