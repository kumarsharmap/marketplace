import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parent-subscription',
  templateUrl: './parent-subscription.component.html',
  styleUrls: ['./parent-subscription.component.css'],
})
export class ParentSubscriptionComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy() {
    this.subscriptions.forEach((i) => i.unsubscribe());
  }
}
