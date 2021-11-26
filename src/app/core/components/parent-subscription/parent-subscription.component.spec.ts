import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSubscriptionComponent } from './parent-subscription.component';

describe('ParentSubscriptionComponent', () => {
  let component: ParentSubscriptionComponent;
  let fixture: ComponentFixture<ParentSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
