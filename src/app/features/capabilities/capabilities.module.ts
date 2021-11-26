import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapabilitiesRoutingModule } from './capabilities-routing.module';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapabilitiesViewComponent } from './components/capabilities-view/capabilities-view.component';
import { QuillModule } from 'ngx-quill';
import { CapabilitiesHomeComponent } from './components/capabilities-home/capabilities-home.component';
import { CapabilitiesTechnicalSummaryComponent } from './components/capabilities-technical-summary/capabilities-technical-summary.component';
import { CapabilitiesResourcesComponent } from './components/capabilities-resources/capabilities-resources.component';
import { CapabilitiesUpdatesComponent } from './components/capabilities-updates/capabilities-updates.component';
import { CapabilitiesCreateComponent } from './components/capabilities-create/capabilities-create.component'
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { LandingModule } from '../landing/landing.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    CapabilitiesComponent,
    CapabilitiesViewComponent,
    CapabilitiesHomeComponent,
    CapabilitiesTechnicalSummaryComponent,
    CapabilitiesResourcesComponent,
    CapabilitiesUpdatesComponent,
    CapabilitiesCreateComponent
  ],
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    CapabilitiesRoutingModule,
    QuillModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    LandingModule,
    AccordionModule
  ],
  exports: [
    CapabilitiesComponent,
    CapabilitiesViewComponent,
    CapabilitiesHomeComponent,
    CapabilitiesTechnicalSummaryComponent,
    CapabilitiesResourcesComponent,
    CapabilitiesUpdatesComponent,
    CapabilitiesCreateComponent
  ],
  providers: [
    CapabilitiesComponent,
    CapabilitiesViewComponent,
    CapabilitiesHomeComponent,
    CapabilitiesTechnicalSummaryComponent,
    CapabilitiesResourcesComponent,
    CapabilitiesUpdatesComponent,
    CapabilitiesCreateComponent,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [CapabilitiesComponent]

})
export class CapabilitiesModule { }
