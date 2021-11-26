import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './componets/search/search.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CapabilitiesModule } from '../capabilities/capabilities.module';
import { ComponentsModule } from '../components/components.module';
import { FoundationModule } from '../foundation/foundation.module';
import { GuidesModule } from '../guides/guides.module';
import { LibrariesModule } from '../libraries/libraries.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TabsModule.forRoot(),
    QuillModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    CapabilitiesModule,
    ComponentsModule,
    LibrariesModule,
    FoundationModule,
    GuidesModule
  ]
})
export class SearchModule { }
