import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { appConfig } from "../../core/config/app-config";

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>{{ appName }}</span>
      <span style="flex: 1"></span>
      <a mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a mat-button routerLink="/devices" routerLinkActive="active">Devices</a>
      <a mat-button routerLink="/games" routerLinkActive="active">Games</a>
      <a mat-button routerLink="/promotions" routerLinkActive="active">Promotions</a>
      <a mat-button routerLink="/audit-log" routerLinkActive="active">Audit log</a>
      <a mat-button routerLink="/profile" routerLinkActive="active">Profile</a>
    </mat-toolbar>

    <main class="container">
      <router-outlet/>
    </main>
  `,
  styles: [
    `
      .container {
        padding: 1.5rem;
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AdminShellComponent {
  readonly appName = appConfig.appName;
}
