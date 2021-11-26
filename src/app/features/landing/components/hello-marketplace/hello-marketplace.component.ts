import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
@Component({
  selector: 'app-hello-marketplace',
  templateUrl: './hello-marketplace.component.html',
  styleUrls: ['./hello-marketplace.component.css'],
})
export class HelloMarketplaceComponent extends ParentSubscriptionComponent implements OnInit {
  userName: string;
  constructor(private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
    this.displayUserName();
  }
  public displayUserName(): void {
    this.userName = sessionStorage.getItem('userName');
  }
}