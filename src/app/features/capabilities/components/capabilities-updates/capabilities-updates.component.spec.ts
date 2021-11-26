import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesUpdatesComponent } from './capabilities-updates.component';

describe('CapabilitiesUpdatesComponent', () => {
  let component: CapabilitiesUpdatesComponent;
  let fixture: ComponentFixture<CapabilitiesUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
