import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/regsiter/register.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private loginService: LoginService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public onForgot(): void {
    this.forgotPasswordForm.markAllAsTouched();
    if (this.forgotPasswordForm.valid) {
      const data = {
        email: this.forgotPasswordForm.controls.email.value,
        newPassword: '',
        password: ''
      };
      this.subscriptions.push(
        this.registerService.forgotPassword(data).pipe(take(1)).subscribe(
          () => {
            this.router.navigate(['/forgotpassword']);
            this.loginService.authentication$.next(null);
          },
          (error: HttpErrorResponse) => {
            throw error;
          }
        )
      );
    }
  }
}
