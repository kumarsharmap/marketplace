import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCapabilityUpdatesComponent } from './latest-capability-updates.component';

describe('LatestCapabilityUpdatesComponent', () => {
  let component: LatestCapabilityUpdatesComponent;
  let fixture: ComponentFixture<LatestCapabilityUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestCapabilityUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestCapabilityUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
