import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslatePipe } from "../../../core/i18n/translate.pipe";
import { AuthService } from "../../../core/auth/auth.service";
import { I18nService } from "../../../core/i18n/i18n.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "admin-forgot-password",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  styleUrl: "../../../styles/card-styles.scss",
  template: `
    <div class="card">

      <h1>{{ "auth.forgot.title" | translate }}</h1>
      <p>{{ "auth.forgot.subtitle" | translate }}</p>

      @if (submitted()) {
        <p class="success">{{ "auth.forgot.success" | translate }}</p>
        <a routerLink="/login">{{ "auth.forgot.backToLogin" | translate }}</a>
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label>
            {{ "auth.forgot.emailLabel" | translate }}
            <input type="email" formControlName="email" autocomplete="email" />
          </label>

          @if (error()) {
            <p class="error" role="alert">{{ error() }}</p>
          }

          <button type="submit" [disabled]="form.invalid || loading()">
            @if (loading()) {
              <mat-spinner diameter="24" />
            } @else {
              {{ "auth.forgot.submit" | translate }}
            }
          </button>
        </form>

        <a routerLink=".login">{{ "auth.forgot.backToLogin" | translate }}</a>
      }
    </div>
  `,
  styles: [
    `
      .success {
        color: #2e7d32;
      }
    `,
  ],
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly i18n = inject(I18nService);

  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    this.auth.requestPasswordReset(this.form.getRawValue().email).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(this.auth.translatePasswordResetError(err));
      },
    });
  }
}
