import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { appConfig } from "../../core/config/app-config";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: ` <mat-toolbar color="primary">
    <span>{{ appName }}</span>
    <span style="flex: 1"></span>
    <a mat-button routerLink="/catalog" routerLinkActive="active">Catalog</a>
    <a mat-button routerLink="/login" routerLinkActive="active">Login</a>
    <a mat-button routerLink="/register" routerLinkActive="active">Register</a>
    <a mat-button routerLink="/account" routerLinkActive="active">Account</a>
  </mat-toolbar>

  <main class="container">
    <router-outlet />
  </main>`,

  styles: [
    `
      .container {
        padding: 1.5rem;
        max-width: 1100px;
        margin: 0 auto;
      }

      .active {
        font-weight: 600;
      },
    `,
  ]
})
export class ShellComponent {
  readonly appName = appConfig.appName;
}
