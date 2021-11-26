import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-email-sent',
  templateUrl: './forgot-password-email-sent.component.html',
  styleUrls: ['./forgot-password-email-sent.component.css'],
})
export class ForgotPasswordEmailSentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickLogin() {
    this.router.navigate(['/']);
  }
}
