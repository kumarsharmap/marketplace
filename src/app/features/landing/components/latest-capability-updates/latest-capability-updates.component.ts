import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';

@Component({
  selector: 'app-latest-capability-updates',
  templateUrl: './latest-capability-updates.component.html',
  styleUrls: ['./latest-capability-updates.component.css']
})
export class LatestCapabilityUpdatesComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public menu: MenuService,
    public searchComponent: SearchComponent

  ) { }
  public capabilitiesLatest: any;
  public currentPage = 1;

  public ngOnInit(): void {
    this.capabilitiesLatest = [];
    this.loginService.getCapabilitiesLatestUpdates().subscribe(
      (response) => {
        this.capabilitiesLatest = [];
        if (response !== null) {
          this.capabilitiesLatest = response;
          this.getColors();
        } else {
          this.capabilitiesLatest = [];
        }
      },
      (error) => { }
    );
  }
  public getColors(): void {
    /*this.menu.getAllColors().subscribe((colors) => {
      for (const i in this.capabilitiesLatest) {
        for (const k in colors) {
          if (this.capabilitiesLatest[i].tenantName === colors[k].tenantName) {
            this.capabilitiesLatest[i].lightColor = this.hexToRGB(colors[k].tenantColor, 0.1);
            this.capabilitiesLatest[i].darkColor = colors[k].tenantColor;
          }
        }
      }
    });*/
  }
  public hexToRGB(hex, alpha): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  public navigateTosearcPage(capabilitiesLatest): void {
    capabilitiesLatest['path'] = 'Latest';
    this.searchComponent.navigateToViewPage(capabilitiesLatest);
  }
}
