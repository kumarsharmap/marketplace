import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';


@Component({
	selector: 'app-gudies-trending',
	templateUrl: './guides-trending.component.html',
	styleUrls: ['./guides-trending.component.css']
})
export class GudiesTrendingComponent implements OnInit {
	constructor(public loginService: LoginService, public searchComponent: SearchComponent) { }
	listofTrendingGuides: any;
	ngOnInit(): void {
		this.loginService.getTrendingGuides().subscribe(
			(res) => {
				if (res != null) {
					this.listofTrendingGuides = res;
				} else {
					this.listofTrendingGuides = [];
				}
			},
			(error: HttpErrorResponse) => {
				throw new Error(error.error.message);
			}
		);
	}
	navigateTosearcPage(componentsLatest) {
		componentsLatest['path'] = 'Latest';
		this.searchComponent.navigateToViewPage(componentsLatest);
	}
}
