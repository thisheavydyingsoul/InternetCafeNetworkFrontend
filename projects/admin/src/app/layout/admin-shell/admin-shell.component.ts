import {Component, inject} from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { appConfig } from "../../core/config/app-config";
import {TranslatePipe} from "../../core/i18n/translate.pipe";
import {LanguageSwitcherComponent} from "../../shared/language-switcher/language-switcher.component";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcherComponent,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>{{ appName }}</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a mat-button routerLink="/devices" routerLinkActive="active">Devices</a>
      <a mat-button routerLink="/games" routerLinkActive="active">Games</a>
      <a mat-button routerLink="/promotions" routerLinkActive="active">Promotions</a>
      <a mat-button routerLink="/audit-log" routerLinkActive="active">Audit log</a>
      <a mat-button routerLink="/profile" routerLinkActive="active">Profile</a>
      <span class="spacer"></span>
      <admin-language-switcher/>
      @if (auth.user()?.email; as email) {
        <span class="user-email">{{ email }}</span>
      }
      <button mat-button type="button" (click)="logOut()">
        {{ "auth.logout" | translate }}
      </button>
    </mat-toolbar>

    <main class="container">
      <router-outlet/>
    </main>
  `,
  styles: [
    `
      .spacer {
        flex: 1;
      }
      .container {
        padding: 1.5rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .user-email {
        margin: 0 0.75rem;
        font-size: 0.875rem;
        opacity: 0.9;
      }
    `,
  ],
})
export class AdminShellComponent {
  readonly appName = appConfig.appName;
  readonly auth = inject(AuthService);

  logOut(): void {
    this.auth.logOut().subscribe();
  }
}
