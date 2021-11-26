import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';

@Component({
  selector: 'app-top-guides-for-designers',
  templateUrl: './top-guides-for-designers.component.html',
  styleUrls: ['./top-guides-for-designers.component.css']
})
export class TopGuidesForDesignersComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public menu: MenuService,
    public searchComponent: SearchComponent
  ) { }
  public topDesignGuides: any;
  public currentPage = 1;
  public ngOnInit(): void {
    this.topDesignGuides = [];
    this.loginService.getDesignerGuidesLatestUpdates().subscribe(
      (response) => {
        this.topDesignGuides = [];
        if (response !== null) {
          this.topDesignGuides = response;
        } else {
          this.topDesignGuides = [];
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
