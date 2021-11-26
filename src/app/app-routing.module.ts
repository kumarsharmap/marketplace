import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import(`./features/auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import(`./features/landing/landing.module`).then((m) => m.LandingModule),
  },
  {
    path: 'createTenantList',
    loadChildren: () =>
      import(`./features/super-admin/super-admin.module`).then(
        (m) => m.SuperAdminModule
      ),
  },
  {
    path: 'approval',
    loadChildren: () =>
      import(`./features/admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path: 'Capabilities',
    loadChildren: () =>
      import(`./features/capabilities/capabilities.module`).then(
        (m) => m.CapabilitiesModule
      ),
  },
  {
    path: 'DesignFoundations',
    loadChildren: () =>
      import(`./features/foundation/foundation.module`).then(
        (m) => m.FoundationModule
      ),
  },
  {
    path: 'Guides',
    loadChildren: () =>
      import(`./features/guides/guides.module`).then(
        (m) => m.GuidesModule
      ),
  },
  {
    path: 'Components',
    loadChildren: () =>
      import(`./features/components/components.module`).then(
        (m) => m.ComponentsModule
      ),
  },
  {
    path: 'Search',
    loadChildren: () =>
      import(`./features/search/search.module`).then(
        (m) => m.SearchModule
      ),
  },
  {
    path: 'Libraries',
    loadChildren: () =>
      import(`./features/libraries/libraries.module`).then(
        (m) => m.LibrariesModule
      ),
  },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true,
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0],
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
