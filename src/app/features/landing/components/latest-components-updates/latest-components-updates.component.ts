import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';

@Component({
  selector: 'app-latest-components-updates',
  templateUrl: './latest-components-updates.component.html',
  styleUrls: ['./latest-components-updates.component.css']
})
export class LatestComponentsUpdatesComponent implements OnInit {
  constructor(public loginService: LoginService,
    public menu: MenuService,
    public searchComponent: SearchComponent
  ) { }
  public componentsLatest: any;
  public currentPage = 1;
  public ngOnInit(): void {
    this.componentsLatest = [];
    this.loginService.getComponentLatestUpdates().subscribe(
      (response) => {
        this.componentsLatest = [];
        if (response !== null) {
          this.componentsLatest = response;
          this.getColors();
        } else {
          this.componentsLatest = [];
        }
      },
      (error) => { }
    );
  }
  public getColors(): void {
    this.menu.getAllColors().subscribe((colors) => {
      for (const i in this.componentsLatest) {
        for (const k in colors) {
          if (this.componentsLatest[i].tenantName == colors[k].tenantName) {
            this.componentsLatest[i].lightColor = this.hexToRGB(colors[k].tenantColor, 0.1);
            this.componentsLatest[i].darkColor = colors[k].tenantColor;
          }
        }
      }
    });
  }
  public hexToRGB(hex, alpha): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  public navigateTosearcPage(componetLatest): void {
    componetLatest['path'] = 'Latest';
    this.searchComponent.navigateToViewPage(componetLatest);
  }

}
