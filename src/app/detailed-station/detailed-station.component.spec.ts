import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStationComponent } from './detailed-station.component';

describe('DetailedStationComponent', () => {
  let component: DetailedStationComponent;
  let fixture: ComponentFixture<DetailedStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
