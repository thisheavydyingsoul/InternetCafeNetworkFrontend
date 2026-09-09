import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { emailVerifiedGuard } from './core/guards/email-verified.guard';
import { guestGuard } from './core/guards/guest.guard';
import { CheckEmailComponent } from "./features/auth/check-email/check-email.component";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./layout/shell/shell.component").then((m) => m.ShellComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "catalog",
      },

      {
        path: "register",
        canActivate: [guestGuard],
        loadComponent: () =>
          import("./features/auth/register/register.component").then(
            (m) => m.RegisterComponent,
          ),
        title: "Register",
      },

      {
        path: "login",
        canActivate: [guestGuard],
        loadComponent: () =>
          import("./features/auth/login/login.component").then(
            (m) => m.LoginComponent,
          ),
        title: "Login",
      },

      {
        path: "check-email",
        loadComponent: () =>
          import("./features/auth/check-email/check-email.component").then(
            (m) => m.CheckEmailComponent,
          ),
        title: "Check your email",
      },

      {
        path: "verify-email",
        loadComponent: () =>
          import("./features/auth/verify-email/verify-email.component").then(
            (m) => m.VerifyEmailComponent,
          ),
        title: "Verify email",
      },

      {
        path: "verify-email-required",
        loadComponent: () =>
          import("./features/auth/verify-email-required/verify-email-required.component").then(
            (m) => m.VerifyEmailRequiredComponent,
          ),
        title: "Verify your email",
      },

      {
        path: "catalog",
        loadComponent: () =>
          import("./features/catalog/catalog.component").then(
            (m) => m.CatalogComponent,
          ),
        title: "Catalog",
      },

      {
        path: "catalog/:deviceId",
        loadComponent: () =>
          import("./features/catalog/device-detail/device-detail.component").then(
            (m) => m.DeviceDetailComponent,
          ),
        title: "Device details",
      },

      {
        path: "rental/new",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./features/rental/rental-create/rental-create.component").then(
            (m) => m.RentalCreateComponent,
          ),
        title: "Create rental",
      },

      {
        path: "rental/:rentId",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./features/rental/rental-detail/rental-detail.component").then(
            (m) => m.RentalDetailComponent,
          ),
        title: "Rental details",
      },

      {
        path: "checkout/:rentId",
        canActivate: [authGuard, emailVerifiedGuard],
        loadComponent: () =>
          import("./features/checkout/checkout.component").then(
            (m) => m.CheckoutComponent,
          ),
        title: "Checkout",
      },

      {
        path: "checkout/:rentId/result",
        canActivate: [authGuard, emailVerifiedGuard],
        loadComponent: () =>
          import("./features/checkout/payment-result/payment-result.component").then(
            (m) => m.PaymentResultComponent,
          ),
        title: "Payment result",
      },

      {
        path: "account",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./features/account/account.component").then(
            (m) => m.AccountComponent,
          ),
        title: "My account",
      },

      {
        path: "account/rentals",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./features/account/rental-history/rental-history.component").then(
            (m) => m.RentalHistoryComponent,
          ),
        title: "My rentals",
      },

      {
        path: "account/reviews",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./features/account/reviews/reviews.component").then(
            (m) => m.ReviewsComponent,
          ),
        title: "My reviews",
      },
    ],
  },

  {
    path: "**",
    loadComponent: () =>
      import("./shared/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
    title: "Page not found",
  },
];
