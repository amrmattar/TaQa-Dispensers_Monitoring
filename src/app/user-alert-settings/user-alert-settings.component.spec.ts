import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlertSettingsComponent } from './user-alert-settings.component';

describe('UserAlertSettingsComponent', () => {
  let component: UserAlertSettingsComponent;
  let fixture: ComponentFixture<UserAlertSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAlertSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAlertSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
