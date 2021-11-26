import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationIndicationComponent } from './components/navigation-indication/navigation-indication.component';
import { CoreRoutingModule } from './core-routing.module';
import { NavigationDropdownDirective } from './directives/drop-down/navigation-dropdown.directive';
import { HasRoleDirective } from './directives/has-role/has-role.directive';
import { APIInterceptor } from './interceptors/api-interceptors';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { SortPipe } from './pipes/sort.pipe';
import { GlobalErrorHandlerService } from './services/global-error-handler/global-error-handler.service';
import { MenuService } from './services/menu/menu.service';
import { UserInfoEffects } from './store/user-info/effects/user-info.effect';
import * as fromUserInfo from './store/user-info/reducers/user-info.reducers';

@NgModule({
  declarations: [
    HeaderAdminComponent,
    HeaderComponent,
    NavigationDropdownDirective,
    HasRoleDirective,
    NavigationIndicationComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 3000
    }),
    EffectsModule.forFeature([UserInfoEffects]),
    StoreModule.forFeature(fromUserInfo.UserInfoFeatureKey, fromUserInfo.reducer)
  ],
  exports: [
    HeaderAdminComponent,
    HeaderComponent,
    NavigationDropdownDirective,
    HasRoleDirective,
    NavigationIndicationComponent,
    SortPipe
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    SortPipe
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [MenuService]
    };
  }
}

