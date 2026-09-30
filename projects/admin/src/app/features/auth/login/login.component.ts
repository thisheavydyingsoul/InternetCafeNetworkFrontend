import {AfterViewInit, effect, Component, ElementRef, inject, signal, ViewChild} from "@angular/core";
import {TranslatePipe} from "../../../core/i18n/translate.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthService} from "../../../core/auth/auth.service";
import { Router, RouterLink } from "@angular/router";
import {I18nService} from "../../../core/i18n/i18n.service";
import {appConfig} from "../../../core/config/app-config";

@Component({
  selector: "admin-login",
  standalone: true,
  imports: [
    TranslatePipe,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  styleUrl: "../../../styles/card-styles.scss",
  template: `
    <div class="card">
      <h1>{{ "auth.login.title" | translate }}</h1>
      <p>{{ "auth.login.subtitle" | translate }}</p>

      <a routerLink="/forgot-password">
        {{ "auth.login.forgotPassword" | translate }}</a
      >
      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }

      @if (loading()) {
        <mat-spinner diameter="40" />
        <p>{{ "auth.login.loading" | translate }}</p>
      }

      <div #googleBtn class="google-btn-host"></div>
    </div>
  `,
  styles: [
    `
      .google-btn-host {
        min-height: 44px;
      }
    `,
  ],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild("googleBtn", { static: true }) googleBtn!: ElementRef<HTMLElement>;

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.i18n.locale();
      if (this.googleBtn) {
        this.renderGoogleButton();
      }
    });
  }

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  renderGoogleButton(): void {
    this.googleBtn.nativeElement.innerHTML = "";
    if (typeof google === "undefined" || !google.accounts?.id) {
      this.error.set(this.i18n.t("auth.login.googleUnavailable"));
      return;
    }
    google.accounts.id.initialize({
      client_id: appConfig.googleClientId,
      locale: this.i18n.locale(),
      callback: (response) => this.onCredential(response.credential),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: "outline",
      size: "large",
      type: "standard",
      locale: this.i18n.locale(),
    });
  }

  private onCredential(idToken: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.auth.loginWithGoogle(idToken).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(["/dashboard"]);
      },
      error: (msg: string) => {
        this.loading.set(false);
        this.error.set(
          typeof msg === "string" ? msg : this.i18n.t("auth.errors.generic"),
        );
      },
    });
  }
}
