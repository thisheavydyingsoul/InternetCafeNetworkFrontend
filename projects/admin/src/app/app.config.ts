import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./core/auth/auth.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {AuthService} from "./core/auth/auth.service";
import {firstValueFrom} from "rxjs";
import {I18nService} from "./core/i18n/i18n.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideAppInitializer(async () => {
      const i18n = inject(I18nService);
      const auth = inject(AuthService);
      await i18n.init();
      await firstValueFrom(auth.loadMe());
    }),
  ]
};
