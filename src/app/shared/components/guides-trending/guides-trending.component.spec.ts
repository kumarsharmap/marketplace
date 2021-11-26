import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesTrendingComponent } from './guides-trending.component';

describe('GuidesTrendingComponent', () => {
  let component: GuidesTrendingComponent;
  let fixture: ComponentFixture<GuidesTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidesTrendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
