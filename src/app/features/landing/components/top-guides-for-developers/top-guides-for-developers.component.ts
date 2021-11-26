import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';

@Component({
  selector: 'app-top-guides-for-developers',
  templateUrl: './top-guides-for-developers.component.html',
  styleUrls: ['./top-guides-for-developers.component.css']
})
export class TopGuidesForDevelopersComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public menu: MenuService,
    public searchComponent: SearchComponent
  ) { }
  public topDeveloperGuides: any;
  public currentPage = 1;
  public ngOnInit(): void {
    this.topDeveloperGuides = [];
    this.loginService.getDeveloperGuidesLatestUpdates().subscribe(
      (response) => {
        this.topDeveloperGuides = [];
        if (response !== null) {
          this.topDeveloperGuides = response;
        } else {
          this.topDeveloperGuides = [];
        }
      },
      (error) => { }
    );
  }
  public navigateTosearcPage(topDeveloperGuides): void {
    topDeveloperGuides['path'] = 'Latest';
    this.searchComponent.navigateToViewPage(topDeveloperGuides);
  }


}
