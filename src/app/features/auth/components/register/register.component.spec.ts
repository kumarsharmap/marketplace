import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { RegisterService } from '../../services/regsiter/register.service';
import { RouterModule } from '@angular/router';
import { routes } from '../../auth-routing.module';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        ToastrModule.forRoot(),
      ],
      providers: [RegisterService, ToastNotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'Register form should be invalid',
    waitForAsync(() => {
      component.registrationForm.controls.email.setValue('');
      component.registrationForm.controls.username.setValue('');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  );
});
