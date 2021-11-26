import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchComponent } from 'src/app/features/search/componets/search/search.component';
import { CapabilitiesService } from '../capabilities/capabilities.service';

@Component({
  selector: 'app-capabilities-home',
  templateUrl: './capabilities-home.component.html',
  styleUrls: ['./capabilities-home.component.css']
})
export class CapabilitiesHomeComponent implements OnInit {

  @Input('data') input;
  listofMostViewedArtifacts: any;
  constructor(
    public capabilityService: CapabilitiesService,
    public loginService: LoginService,
    public searchComponent: SearchComponent
  ) { }
  ngOnInit(): void {
    this.loginService.getMostPopularArtifacts().subscribe(
      (res) => {
        if (res != null) {
          this.listofMostViewedArtifacts = res;
        } else {
          this.listofMostViewedArtifacts = [];
        }
      },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);
      }
    );
  }
  navigateTosearcPage(mostView) {
    mostView['path'] = 'Latest';
    this.searchComponent.navigateToViewPage(mostView);
  }
}

