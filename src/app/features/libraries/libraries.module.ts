import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrariesRoutingModule } from './libraries-routing.module';
import { TaskIdDirective } from './Directives/taskid.directive';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { LibrariesCreateComponent } from './components/libraries-create/libraries-create.component';
import { LibrariesHomeComponent } from './components/libraries-home/libraries-home.component';
import { LibrariesViewComponent } from './components/libraries-view/libraries-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarEvents } from 'ngx-perfect-scrollbar/lib/perfect-scrollbar.interfaces';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    TaskIdDirective,
    LibrariesComponent,
    LibrariesCreateComponent,
    LibrariesHomeComponent,
    LibrariesViewComponent
  ],
  imports: [
    CommonModule,
    LibrariesRoutingModule,
    TabsModule.forRoot(),
    QuillModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    TaskIdDirective,
    LibrariesComponent,
    LibrariesCreateComponent,
    LibrariesHomeComponent,
    LibrariesViewComponent
  ]
})
export class LibrariesModule { }
