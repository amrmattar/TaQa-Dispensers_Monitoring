import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTargetComponent } from './settings-target.component';

describe('SettingsTargetComponent', () => {
  let component: SettingsTargetComponent;
  let fixture: ComponentFixture<SettingsTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
