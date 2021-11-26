import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesRoutingModule } from './guides-routing.module';
import { GuidesHomeComponent } from './components/guides-home/guides-home.component';
import { GuidesLeftmenuComponent } from './components/guides-leftmenu/guides-leftmenu.component';
import { GuideViewComponent } from './components/guide-view/guide-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FoundationComponent } from '../foundation/components/foundation/foundation.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { IvyCarouselModule } from 'angular-responsive-carousel';


@NgModule({
  declarations: [GuidesHomeComponent, GuidesLeftmenuComponent, GuideViewComponent],
  imports: [
    CommonModule,
    GuidesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule,
    FormsModule,
    CoreModule,
    NgxPaginationModule,
    NgImageSliderModule,
    IvyCarouselModule
  ],
  exports: [GuidesLeftmenuComponent, GuidesHomeComponent, GuideViewComponent],
  providers: [FoundationComponent]
})
export class GuidesModule { }
