import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ComponentCodeComponent } from './components/component-code/component-code.component';
import { ComponentCreateComponent } from './components/component-create/component-create.component';
import { ComponentHomePageComponent } from './components/component-home-page/component-home-page.component';
import { ComponentLeftMenuComponent } from './components/component-left-menu/component-left-menu.component';
import { ComponentUsageComponent } from './components/component-usage/component-usage.component';
import { ComponentViewComponent } from './components/component-view/component-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CapabilitiesModule } from '../capabilities/capabilities.module';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { CapabilitiesTechnicalSummaryComponent } from '../capabilities/components/capabilities-technical-summary/capabilities-technical-summary.component';
import { CapabilitiesResourcesComponent } from '../capabilities/components/capabilities-resources/capabilities-resources.component';
import { CapabilitiesUpdatesComponent } from '../capabilities/components/capabilities-updates/capabilities-updates.component';
import { CapabilitiesService } from '../capabilities/components/capabilities/capabilities.service';
import { CapabilitiesViewComponent } from '../capabilities/components/capabilities-view/capabilities-view.component';
import { CapabilitiesHomeComponent } from '../capabilities/components/capabilities-home/capabilities-home.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [ComponentCodeComponent, ComponentCreateComponent, ComponentHomePageComponent, ComponentLeftMenuComponent, ComponentUsageComponent, ComponentViewComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommonModule,
    AccordionModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    CapabilitiesModule,
    QuillModule.forRoot(),
    SharedModule,
    CoreModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    ComponentLeftMenuComponent,
    ComponentHomePageComponent,
    ComponentCreateComponent,
    ComponentCodeComponent,
    ComponentUsageComponent,
    ComponentViewComponent
  ],
  providers: [
    CapabilitiesTechnicalSummaryComponent,
    CapabilitiesResourcesComponent,
    CapabilitiesUpdatesComponent,
    CapabilitiesService,
    CapabilitiesViewComponent,
    CapabilitiesHomeComponent
  ]
})
export class ComponentsModule { }
