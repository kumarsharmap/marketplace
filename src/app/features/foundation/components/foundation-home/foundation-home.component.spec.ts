import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationHomeComponent } from './foundation-home.component';

describe('FoundationHomeComponent', () => {
  let component: FoundationHomeComponent;
  let fixture: ComponentFixture<FoundationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
