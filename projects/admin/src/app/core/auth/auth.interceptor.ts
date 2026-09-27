import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";
import {appConfig} from "../config/app-config";

function isAuthPublicUrl(url: string): boolean {
  return (
    url.includes("/auth/admin/google") ||
    url.includes("/auth/admin/refresh") ||
    url.includes("/i18n/")
  )
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenStorageService);
  const auth = inject(AuthService);

  let request = req;
  const token = tokens.getAccessToken();
  if(token && !isAuthPublicUrl(req.url) && req.url.startsWith(appConfig.apiBaseUrl)) {
    request = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if(
        err.status !== 401 ||
        isAuthPublicUrl(req.url) ||
        isAuthPublicUrl(req.url) ||
        req.url.includes("/auth/admin/refresh")
      ) {
        return throwError(() => err);
      }

      return auth.refreshSession().pipe(
        switchMap(() => {
          const retry = req.clone({
            setHeaders: { Authorization: `Bearer ${tokens.getAccessToken()}` },
          });
          return next(retry);
        }),
        catchError(() => {
          auth.clearSession();
          return throwError(() => err);
          }),
      );
    }),
  );
};
