import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesHomeComponent } from './capabilities-home.component';

describe('CapabilitiesHomeComponent', () => {
  let component: CapabilitiesHomeComponent;
  let fixture: ComponentFixture<CapabilitiesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
