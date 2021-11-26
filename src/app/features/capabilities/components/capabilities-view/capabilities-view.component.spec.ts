import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilitiesViewComponent } from './capabilities-view.component';

describe('CapabilitiesViewComponent', () => {
  let component: CapabilitiesViewComponent;
  let fixture: ComponentFixture<CapabilitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
