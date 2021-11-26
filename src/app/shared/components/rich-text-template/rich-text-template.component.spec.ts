import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextTemplateComponent } from './rich-text-template.component';

describe('RichTextTemplateComponent', () => {
  let component: RichTextTemplateComponent;
  let fixture: ComponentFixture<RichTextTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichTextTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
