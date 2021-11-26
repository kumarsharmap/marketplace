import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCreateComponent } from './component-create.component';

describe('ComponentCreateComponent', () => {
  let component: ComponentCreateComponent;
  let fixture: ComponentFixture<ComponentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
