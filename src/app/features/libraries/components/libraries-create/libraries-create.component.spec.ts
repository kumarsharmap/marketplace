import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesCreateComponent } from './libraries-create.component';

describe('LibrariesCreateComponent', () => {
  let component: LibrariesCreateComponent;
  let fixture: ComponentFixture<LibrariesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
