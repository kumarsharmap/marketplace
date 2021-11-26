import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRichTextTemplateComponent } from './view-rich-text-template.component';


describe('ViewRictTextTemplateComponent', () => {
  let component: ViewRichTextTemplateComponent;
  let fixture: ComponentFixture<ViewRichTextTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRichTextTemplateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRichTextTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
