import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegisterService } from './services/regsiter/register.service';
import { LoginService } from './services/login/login.service';
import { ForgotPasswordEmailSentComponent } from './components/forgot-password-email-sent/forgot-password-email-sent.component';
import { RegistrationEmailSentComponent } from './components/registration-email-sent/registration-email-sent.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ForgotPasswordEmailSentComponent,
    RegistrationEmailSentComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [RegisterComponent],
  providers: [RegisterService],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [LoginService],
    };
  }
}
