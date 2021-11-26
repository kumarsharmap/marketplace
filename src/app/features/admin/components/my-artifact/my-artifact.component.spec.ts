import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArtifactComponent } from './my-artifact.component';

describe('MyArtifactComponent', () => {
  let component: MyArtifactComponent;
  let fixture: ComponentFixture<MyArtifactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyArtifactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
