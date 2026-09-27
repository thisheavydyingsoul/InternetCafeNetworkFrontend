import {AfterViewInit, Component, ElementRef, inject, signal, ViewChild} from "@angular/core";
import {TranslatePipe} from "../../../core/i18n/translate.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LanguageSwitcherComponent} from "../../../shared/language-switcher/language-switcher.component";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {I18nService} from "../../../core/i18n/i18n.service";
import {appConfig} from "../../../core/config/app-config";

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [TranslatePipe, MatProgressSpinnerModule, LanguageSwitcherComponent],
  template: `
    <div class="login-card">
        <admin-language-switcher (localeChange)="renderGoogleButton()" />

        <h1>{{ "auth.login.title" | translate }}</h1>
        <p>{{ "auth.login.subtitle" | translate }}</p>

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
      .login-card {
        max-width: 420px;
        margin: 4rem auto;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .error {
        color: #b00020;
      }
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

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  renderGoogleButton(): void {
    this.googleBtn.nativeElement.innerHTML = "";
    if(typeof google === "undefined" || !google.accounts?.id) {
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
        this.error.set(typeof msg === "string" ? msg : this.i18n.t("auth.errors.generic"));
      },
    });
  }
}
