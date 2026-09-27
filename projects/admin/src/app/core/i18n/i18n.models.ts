export type AppLocale = "en" | "ru";

export interface I18nEnvironmentConfig {
  defaultLocale: AppLocale;
  supportedLocales: readonly AppLocale[];
  storageKey: string;
}

