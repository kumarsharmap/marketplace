import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHomePageComponent } from './component-home-page.component';

describe('ComponentHomePageComponent', () => {
  let component: ComponentHomePageComponent;
  let fixture: ComponentFixture<ComponentHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
