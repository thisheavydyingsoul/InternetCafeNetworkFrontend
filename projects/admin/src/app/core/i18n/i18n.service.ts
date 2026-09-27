import {computed, inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppLocale} from "./i18n.models";
import {firstValueFrom} from "rxjs";
import {appConfig} from "../config/app-config";

@Injectable({ providedIn: "root" })
export class I18nService {
  private readonly http = inject(HttpClient)

  private readonly localeSignal = signal<AppLocale>(appConfig.i18n.defaultLocale);
  private readonly dictSignal = signal<Record<string, string>>({});

  readonly locale = this.localeSignal.asReadonly();
  readonly ready = computed(() => Object.keys(this.dictSignal()).length > 0);

  t(key: string, params?: Record<string, string | number>): string {
    let text = this.dictSignal() [key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }

    return text;
  }

  supportedLocales(): readonly AppLocale[] {
    return appConfig.i18n.supportedLocales;
  }

  async init(): Promise<void> {
    const stored = localStorage.getItem(appConfig.i18n.storageKey) as AppLocale | null;
    const locale =
      stored && appConfig.i18n.supportedLocales.includes(stored)
      ? stored
      : appConfig.i18n.defaultLocale;

    await this.setLocale(locale);
  }

  async setLocale(locale: AppLocale) : Promise<void> {
    const dict = await firstValueFrom(
      this.http.get<Record<string, string>>(`/i18n/${locale}.json`),
    );
    this.dictSignal.set(dict);
    this.localeSignal.set(locale);
    localStorage.setItem(appConfig.i18n.storageKey, locale);
    document.documentElement.lang = locale;
  }
}
