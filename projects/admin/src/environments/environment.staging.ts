import {I18nEnvironmentConfig} from "../app/core/i18n/i18n.models";

export const environment = {
  production: false,
  apiBaseUrl: "http://72.56.236.45:8080/api",
  appName: "Internet Cafe Admin (Staging)",
  googleClientId:
    "525319027158-7q895vbk8hrao81gs5r87s6rhb62bo4k.apps.googleusercontent.com",
  i18n: {
    defaultLocale: "en",
    supportedLocales: ["en", "ru"],
    storageKey: "admin.locale",
  } satisfies I18nEnvironmentConfig,
};
