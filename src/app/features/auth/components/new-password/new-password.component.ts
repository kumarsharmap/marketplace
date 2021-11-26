import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/regsiter/register.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  public newPasswordForm: FormGroup;
  public userEmailName: string;
  public incorrectPassword: boolean;
  public passwordMatchError: boolean;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private loginService: LoginService,
    private toastNotificationService: ToastNotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createNewPasswordForm();
    this.getEmail();
  }

  public onPasswordChanged(): void {
    this.newPasswordForm.markAllAsTouched();
    this.passwordMatchError = this.passwordError() === false ? false : true;
    if (this.newPasswordForm.valid && !this.passwordMatchError) {
      const email = this.userEmailName;
      const forgotWordValue = {
        email: email,
        newPassword: this.createPassword?.get('newPassword').value,
        password: this.newPasswordForm?.controls['password'].value
      };
      this.subscriptions.push(
        this.registerService.changePassword(forgotWordValue).subscribe(
          (data) => {
            if (data === 'Password Reset Successfully !') {
              this.toastNotificationService.showSuccess(CommonConstants.PASSWORDCHANGE);
              this.router.navigate(['/landing']);
            } else {
              this.toastNotificationService.showError(data);
            }
          },
          (error: HttpErrorResponse) => {
            throw error;
          }
        )
      );
    }
  }
  private getEmail(): void {
    this.userEmailName = sessionStorage.getItem('userEmail');
    this.newPasswordForm.get('email').setValue(this.userEmailName);
    this.newPasswordForm.get('email').disable();
  }
  public hideIncorrectError(): void {
    this.incorrectPassword = false;
  }
  public hidematchError(): void {
    this.passwordMatchError = false;
  }
  private createNewPasswordForm(): void {
    this.newPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      createPassword: new FormGroup({
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z0-9]+$')
        ]),
        confirmPassword: new FormControl('', [Validators.required])
      })
    });
  }
  get createPassword(): FormGroup {
    return this.newPasswordForm?.controls['createPassword'] as FormGroup;
  }
  private passwordError(): boolean {
    const emailControl = this.createPassword?.get('newPassword');
    const confirmControl = this.createPassword?.get('confirmPassword');
    if (emailControl?.pristine || confirmControl?.pristine) {
      return false;
    }
    if (emailControl?.value === confirmControl?.value) {
      return false;
    } else {
      return true;
    }
  }
}
function emailMatcher(newPasswordForm: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = (newPasswordForm as FormGroup)?.get('newPassword');
  const confirmControl = (newPasswordForm as FormGroup)?.get('confirmPassword');
  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }
  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  return { match: true };
}
