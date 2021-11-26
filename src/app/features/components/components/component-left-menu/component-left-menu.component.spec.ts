import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLeftMenuComponent } from './component-left-menu.component';

describe('ComponentLeftMenuComponent', () => {
  let component: ComponentLeftMenuComponent;
  let fixture: ComponentFixture<ComponentLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
