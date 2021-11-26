import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { SuperAdminModule } from './features/super-admin/super-admin.module';
import { CapabilitiesModule } from './features/capabilities/capabilities.module';
import { AdminModule } from './features/admin/admin.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LandingModule } from './features/landing/landing.module';
import { ComponentsModule } from './features/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { FoundationModule } from './features/foundation/foundation.module';
import { SearchModule } from './features/search/search.module';
import { LibrariesModule } from './features/libraries/libraries.module';
import { EnvService } from './core/services/environment-service/env.service';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    SuperAdminModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AdminModule,
    LandingModule,
    ComponentsModule,
    FoundationModule,
    LibrariesModule,
    SearchModule,
    CapabilitiesModule,
    TabsModule.forRoot(),
    QuillModule.forRoot(),
    NgImageSliderModule,
IvyCarouselModule
  ],
  providers: [DatePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (envService: EnvService) => () => envService.init(),
      deps: [EnvService],
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
