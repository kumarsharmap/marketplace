import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestComponentsUpdatesComponent } from './latest-components-updates.component';

describe('LatestComponentsUpdatesComponent', () => {
  let component: LatestComponentsUpdatesComponent;
  let fixture: ComponentFixture<LatestComponentsUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestComponentsUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestComponentsUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
