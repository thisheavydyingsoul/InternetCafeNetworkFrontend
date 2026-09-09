import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { hrAdminGuard } from './core/guards/hr-admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    title: 'Admin login',
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-shell/admin-shell.component').then(
        (m) => m.AdminShellComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        title: 'Dashboard',
      },

      {
        path: 'devices',
        loadComponent: () =>
          import('./features/devices/device-list/device-list.component').then(
            (m) => m.DeviceListComponent,
          ),
        title: 'Devices',
      },

      {
        path: 'devices/new',
        loadComponent: () =>
          import('./features/devices/device-form/device-form.component').then(
            (m) => m.DeviceFormComponent,
          ),
        title: 'Create device',
      },

      {
        path: 'devices/:deviceId/edit',
        loadComponent: () =>
          import('./features/devices/device-form/device-form.component').then(
            (m) => m.DeviceFormComponent,
          ),
        title: 'Edit device',
      },

      {
        path: 'games',
        loadComponent: () =>
          import('./features/games/game-list/game-list.component').then(
            (m) => m.GameListComponent,
          ),
        title: 'Games',
      },

      {
        path: 'games/new',
        loadComponent: () =>
          import('./features/games/game-form/game-form.component').then(
            (m) => m.GameFormComponent,
          ),
        title: 'Create game',
      },

      {
        path: 'games/:gameId/edit',
        loadComponent: () =>
          import('./features/games/game-form/game-form.component').then(
            (m) => m.GameFormComponent,
          ),
        title: 'Edit game',
      },

      {
        path: 'promotions',
        loadComponent: () =>
          import('./features/promotions/promotion-list/promotion-list.component').then(
            (m) => m.PromotionListComponent,
          ),
        title: 'Promotions',
      },

      {
        path: 'promotions/new',
        loadComponent: () =>
          import('./features/promotions/promotion-form/promotion-form.component').then(
            (m) => m.PromotionFormComponent,
          ),
        title: 'Create promotion',
      },

      {
        path: 'promotions/new:promotionId/edit',
        loadComponent: () =>
          import('./features/promotions/promotion-form/promotion-form.component').then(
            (m) => m.PromotionFormComponent,
          ),
        title: 'Edit promotion',
      },

      {
        path: 'admins',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/admins/admin-list/admin-list.component').then(
            (m) => m.AdminListComponent,
          ),
        title: 'Administrators',
      },

      {
        path: 'admins/new',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/admins/admin-form/admin-form.component').then(
            (m) => m.AdminFormComponent,
          ),
        title: 'Create administrator',
      },

      {
        path: 'admins/:adminId',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/admins/admin-detail/admin-detail.component').then(
            (m) => m.AdminDetailComponent,
          ),
        title: 'Administrator details',
      },

      {
        path: 'admins/:adminId/edit',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/admins/admin-form/admin-form.component').then(
            (m) => m.AdminFormComponent,
          ),
        title: 'Edit administrator',
      },

      {
        path: 'audit-log',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/audit-log/audit-log.component').then(
            (m) => m.AuditLogComponent,
          ),
        title: 'Audit log',
      },

      {
        path: 'profile',
        canActivate: [hrAdminGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent,
          ),
        title: 'My profile',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page not found'
  }
];
