import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesResourcesComponent } from './capabilities-resources.component';

describe('CapabilitiesResourcesComponent', () => {
  let component: CapabilitiesResourcesComponent;
  let fixture: ComponentFixture<CapabilitiesResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
