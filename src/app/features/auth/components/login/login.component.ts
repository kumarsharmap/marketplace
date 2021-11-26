import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememebermeUser: boolean;

  constructor(private loginService: LoginService, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  public onSubmitLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value, true);
      this.loginService.isSetlogIn(true);
    }
  }

  public onRememeberMe(event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      console.log(event);
    } else {
      console.log(event);
    }
  }

  public onForgotPassword(): void {
    this.router.navigate(['/forgot']);
  }

  public onSignupAccount(): void {
    this.router.navigate(['/register']);
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      rememeberme: new FormControl(true),
    });
  }
}
