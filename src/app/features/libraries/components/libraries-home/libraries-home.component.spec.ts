import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesHomeComponent } from './libraries-home.component';

describe('LibrariesHomeComponent', () => {
  let component: LibrariesHomeComponent;
  let fixture: ComponentFixture<LibrariesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
