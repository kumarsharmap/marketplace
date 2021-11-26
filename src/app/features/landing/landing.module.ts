import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelloMarketplaceComponent } from './components/hello-marketplace/hello-marketplace.component';
import { LatestCapabilityUpdatesComponent } from './components/latest-capability-updates/latest-capability-updates.component';
import { TopGuidesForDesignersComponent } from './components/top-guides-for-designers/top-guides-for-designers.component';
import { TopGuidesForDevelopersComponent } from './components/top-guides-for-developers/top-guides-for-developers.component';
import { RecentlyViewedComponent } from './components/recently-viewed/recently-viewed.component';
import { LatestComponentsUpdatesComponent } from './components/latest-components-updates/latest-components-updates.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from '../search/componets/search/search.component';

@NgModule({
  declarations: [
    LandingComponent,
    HelloMarketplaceComponent,
    LatestCapabilityUpdatesComponent,
    TopGuidesForDesignersComponent,
    TopGuidesForDevelopersComponent,
    RecentlyViewedComponent,
    LatestComponentsUpdatesComponent,
  ],
  exports: [
    HelloMarketplaceComponent,
    LatestCapabilityUpdatesComponent,
    LatestComponentsUpdatesComponent,
    TopGuidesForDevelopersComponent,
  ],
  imports: [CommonModule, LandingRoutingModule, SharedModule, NgxPaginationModule],
  providers: [SearchComponent]
})
export class LandingModule { }
