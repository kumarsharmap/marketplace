import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationEmailSentComponent } from './registration-email-sent.component';

describe('RegistrationEmailSentComponent', () => {
  let component: RegistrationEmailSentComponent;
  let fixture: ComponentFixture<RegistrationEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationEmailSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
