import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDispenserComponent } from './active-dispenser.component';

describe('ActiveDispenserComponent', () => {
  let component: ActiveDispenserComponent;
  let fixture: ComponentFixture<ActiveDispenserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDispenserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDispenserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
