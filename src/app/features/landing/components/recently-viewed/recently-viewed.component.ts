import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';
import { SearchService } from 'src/app/features/search/sevices/search.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.css']
})
export class RecentlyViewedComponent implements OnInit {
  constructor(
    public searchComponent: SearchComponent,
    public searchService: SearchService,
    public menu: MenuService
  ) { }

  public listOfRecentlyViewed: any;

  public ngOnInit(): void {
    this.searchService.getRecentlyViewed().subscribe(
      (res) => {
        if (res !== null) {
          this.listOfRecentlyViewed = res;
          this.getColors();
        } else {
          this.listOfRecentlyViewed = [];
        }
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
  public navigateTosearcPage(recentilyViewedItemDetails): void {
    recentilyViewedItemDetails['path'] = 'Latest';
    this.searchComponent.navigateToViewPage(recentilyViewedItemDetails);
  }
  public getColors(): void {
    this.menu.getAllColors().subscribe((colors) => {
      for (const i in this.listOfRecentlyViewed) {
        for (const k in colors) {
          if (this.listOfRecentlyViewed[i].tenantName === colors[k].tenantName) {
            this.listOfRecentlyViewed[i].lightColor = this.hexToRGB(colors[k].tenantColor, 0.1);
            this.listOfRecentlyViewed[i].darkColor = colors[k].tenantColor;
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
}
