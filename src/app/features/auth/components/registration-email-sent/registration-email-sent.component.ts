import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-email-sent',
  templateUrl: './registration-email-sent.component.html',
  styleUrls: ['./registration-email-sent.component.css'],
})
export class RegistrationEmailSentComponent implements OnInit {
  constructor(private router: Router) { }

  public ngOnInit(): void { }

  onClickLogin() {
    this.router.navigate(['/']);
  }
}
