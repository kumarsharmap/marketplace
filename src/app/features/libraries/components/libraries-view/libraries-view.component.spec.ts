import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesViewComponent } from './libraries-view.component';

describe('LibrariesViewComponent', () => {
  let component: LibrariesViewComponent;
  let fixture: ComponentFixture<LibrariesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
