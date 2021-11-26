import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesLeftmenuComponent } from './guides-leftmenu.component';

describe('GuidesLeftmenuComponent', () => {
  let component: GuidesLeftmenuComponent;
  let fixture: ComponentFixture<GuidesLeftmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidesLeftmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesLeftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
