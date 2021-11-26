import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesTechnicalSummaryComponent } from './capabilities-technical-summary.component';

describe('CapabilitiesTechnicalSummaryComponent', () => {
  let component: CapabilitiesTechnicalSummaryComponent;
  let fixture: ComponentFixture<CapabilitiesTechnicalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesTechnicalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesTechnicalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
