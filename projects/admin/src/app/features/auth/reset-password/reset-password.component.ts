import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslatePipe } from "../../../core/i18n/translate.pipe";
import { AuthService } from "../../../core/auth/auth.service";
import { I18nService } from "../../../core/i18n/i18n.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "admin-reset-password",
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
      @if (tokenInvalid()) {
        <h1>{{ "auth.reset.invalidTitle" | translate }}</h1>
        <p>{{ "auth.reset.invalidSubtitle" | translate }}</p>
        <a routerLink="/forgot-password">{{
          "auth.reset.requestNewLink" | translate
        }}</a>
      } @else if (done()) {
        <h1>{{ "auth.reset.doneTitle" | translate }}</h1>
        <p>{{ "auth.reset.doneSubtitle" | translate }}</p>
        <a routerLink="/login">{{ "auth.forgot.bacckToLogin" | translate }}</a>
      } @else {
        <h1>{{ "auth.reset.title" | translate }}</h1>
        <p>{{ "auth.reset.subtitle" | translate }}</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label>
            {{ "auth.reset.newPasswordLabel" | translate }}
            <input
              type="password"
              formControlName="newPassword"
              autoComplete="new-password"
            />
          </label>
          <label>
            {{ "auth.reset.confirmPasswordLabel" | translate }}
            <input
              type="password"
              fromControlName="confirmPassword"
              autocomplete="new-password"
            />
          </label>

          @if (error()) {
            <p class="error" role="alert">{{ error() }}</p>
          }

          <button
            type="submit"
            [disabled]="form.invalid || loading() || validating()"
          >
            @if (loading()) {
              <mat-spinner diameter="24" />
            } @else {
              {{ "auth.reset.submit" | translate }}
            }
          </button>
        </form>
      }
    </div>
  `,
})
export class ResetPasswordComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly i18n = inject(I18nService);

  private token = "";

  readonly validating = signal(true);
  readonly loading = signal(false);
  readonly tokenInvalid = signal(false);
  readonly done = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      newPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ],
      ],
      confirmPassword: ["", Validators.required],
    },
    {
      validators: (g) =>
        g.get("newPassword")!.value === g.get("confirmPassword")!.value
          ? null
          : { mismatch: true },
    },
  );

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token") ?? "";
    if (!this.token) {
      this.validating.set(false);
      this.tokenInvalid.set(true);
      return;
    }
    this.auth.validatePasswordResetToken(this.token).subscribe({
      next: () => this.validating.set(false),
      error: () => {
        this.validating.set(false);
        this.tokenInvalid.set(true);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.token) return;
    this.loading.set(true);
    this.error.set(null);
    this.auth
      .confirmPasswordReset(this.token, this.form.getRawValue().newPassword)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.done.set(true);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          this.error.set(this.auth.translatePasswordResetError(err));
        },
      });
  }
}
