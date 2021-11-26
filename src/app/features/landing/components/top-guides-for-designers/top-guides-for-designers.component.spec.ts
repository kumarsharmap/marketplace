import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGuidesForDesignersComponent } from './top-guides-for-designers.component';

describe('TopGuidesForDesignersComponent', () => {
  let component: TopGuidesForDesignersComponent;
  let fixture: ComponentFixture<TopGuidesForDesignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopGuidesForDesignersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopGuidesForDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
