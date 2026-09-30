import {inject, Injectable, signal} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {I18nService} from "../i18n/i18n.service";
import {Router} from "@angular/router";
import {AdminProfile, ApiErrorBody, AuthResponse} from "./auth.models";
import {catchError, finalize, map, Observable, of, tap, throwError} from "rxjs";
import {authErrorI18nKey} from "./auth-error.mapper";
import {appConfig} from "../config/app-config";
import { passwordResetErrorI18nKey } from "./password-reset-error.mapper"

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  isHr: boolean;
  isActive: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokens = inject(TokenStorageService);
  private readonly i18n = inject(I18nService);

  private readonly currentUser = signal<AdminProfile | null>(this.tokens.getProfile());

  user = this.currentUser.asReadonly();

  isAuthenticated(): boolean {
    return this.tokens.hasAccessToken();
  }

  isHrAdmin(): boolean {
    return this.currentUser()?.hr ?? false;
  }

  setUser(user: AdminProfile | null): void {
    this.currentUser.set(user);
  }

  loadMe(): Observable<void> {
    if(!this.tokens.hasAccessToken()) {
      this.currentUser.set(null);
      return of(undefined);
    }
    return this.http.get<AdminProfile>(`${appConfig.apiBaseUrl}/auth/admin/me`).pipe(
      tap((profile) => this.currentUser.set(profile)),
      map(() => undefined),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401 || error.status === 403) {
          this.clearSession();
        }

        return of(undefined);
      }),
    );
  }

  loginWithGoogle(idToken: string): Observable<void> {
    return this.http
      .post<AuthResponse>(`${appConfig.apiBaseUrl}/auth/admin/google`, {idToken})
      .pipe(
        tap((res) => this.applyAuthResponse(res)),
        map(() => undefined),
        catchError((error: HttpErrorResponse) =>
          throwError(() => this.translateAuthError(error)),
        ),
      );
  }

  refreshSession(): Observable<void> {
    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error("No refresh token"));
    }
    return this.http
      .post<AuthResponse>(`${appConfig.apiBaseUrl}/auth/admin/refresh`, { refreshToken })
      .pipe(
        tap((res) => this.applyAuthResponse(res)),
        map(() => undefined),
      );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http
      .post<void>(`${appConfig.apiBaseUrl}/auth/admin/password-reset/forgot`, { email })
      .pipe(map(() => undefined));
  }

  validatePasswordResetToken(token: string): Observable<void> {
    return this.http
      .get<void>(`${appConfig.apiBaseUrl}/auth/admin/password-reset/validate`, {
        params: { token },
    })
      .pipe(map(() => undefined));
  }

  confirmPasswordReset(token: string, newPassword: string): Observable<void> {
    return this.http
      .post<void>(`${appConfig.apiBaseUrl}/auth/admin/password-reset/confirm`, {
        token,
        newPassword,
      })
      .pipe(map(() => undefined));
  }

  translatePasswordResetError(err: HttpErrorResponse): string {
    const body = err.error as ApiErrorBody | undefined;
    const key = passwordResetErrorI18nKey(body);
    return this.i18n.t(key);
  }

  logOut(): Observable<void> {
    if (!this.isAuthenticated()) {
      this.clearSession();
      return of(undefined);
    }
    return this.http.post<void>(`${appConfig.apiBaseUrl}/auth/admin/logout`, {}).pipe(
      catchError(() => of(undefined)),
      finalize(() => {
        this.clearSession();
        void this.router.navigate(["/login"]);
      }),
      map(() => undefined),
    );
  }

  clearSession(): void {
    this.tokens.clear();
    this.currentUser.set(null);
  }

  private applyAuthResponse(res: AuthResponse): void {
    this.tokens.save(res.accessToken, res.refreshToken, res.admin);
    this.currentUser.set(res.admin);
  }

  private translateAuthError(err: HttpErrorResponse): string {
    const body = err.error as ApiErrorBody | undefined;
    const key = authErrorI18nKey(body);
    return this.i18n.t(key);
  }
}
