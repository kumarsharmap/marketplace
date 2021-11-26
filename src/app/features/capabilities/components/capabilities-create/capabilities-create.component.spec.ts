import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesCreateComponent } from './capabilities-create.component';

describe('CapabilitiesCreateComponent', () => {
  let component: CapabilitiesCreateComponent;
  let fixture: ComponentFixture<CapabilitiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
