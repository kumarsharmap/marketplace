import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '../core/core.module';
import { BtnGroupComponent } from './components/btn-group/btn-group.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ConfirmWindowComponent } from './components/confirm-window/confirm-window.component';
import { ParseCodePipe } from './components/customPipe/parse-code.pipe';
import { GudiesTrendingComponent } from './components/guides-trending/guides-trending.component';
import { RichTextTemplateComponent } from './components/rich-text-template/rich-text-template.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ViewRichTextTemplateComponent } from './components/view-rich-text-template/view-rich-text-template.component';

@NgModule({
    declarations: [
        ConfirmWindowComponent,
        BtnGroupComponent,
        CommentsComponent,
        ParseCodePipe,
        RichTextTemplateComponent,
        ViewRichTextTemplateComponent,
        SpinnerComponent,
        GudiesTrendingComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        QuillModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        CoreModule,
        ReactiveFormsModule,
        NgImageSliderModule,
        IvyCarouselModule
    ],
    exports: [
        ConfirmWindowComponent,
        BtnGroupComponent,
        CommentsComponent,
        ParseCodePipe,
        RichTextTemplateComponent,
        ViewRichTextTemplateComponent,
        ReactiveFormsModule,
        SpinnerComponent,
        NgxSpinnerModule,
        GudiesTrendingComponent
    ]
})
export class SharedModule { }
