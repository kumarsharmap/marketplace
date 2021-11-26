import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationRoutingModule } from './foundation-routing.module';
import { FoundationComponent } from './components/foundation/foundation.component';
import { FoundationHomeComponent } from './components/foundation-home/foundation-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FoundationComponent, FoundationHomeComponent],
  imports: [
    CommonModule,
    FoundationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule,
    CoreModule,
    FormsModule,
  ]
})
export class FoundationModule { }
