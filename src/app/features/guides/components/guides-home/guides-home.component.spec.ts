import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesHomeComponent } from './guides-home.component';

describe('GuidesHomeComponent', () => {
  let component: GuidesHomeComponent;
  let fixture: ComponentFixture<GuidesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
