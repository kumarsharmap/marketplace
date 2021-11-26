import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCodeComponent } from './component-code.component';

describe('ComponentCodeComponent', () => {
  let component: ComponentCodeComponent;
  let fixture: ComponentFixture<ComponentCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
