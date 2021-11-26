import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { UserInfoSelectors } from 'src/app/core/store/user-info/selectors/user-info.selectors';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public isAlive = true;
  constructor(private store: Store<any>) { }

  public ngOnInit(): void {
    this.store.pipe(takeWhile(() => this.isAlive), select(UserInfoSelectors.getUserInfo)).subscribe((data) => {
      if (data) {

      }
    });
  }

}
