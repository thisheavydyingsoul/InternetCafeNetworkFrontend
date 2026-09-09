import { environment } from '../../../environments/environment'

export const appConfig = {
  apiBaseUrl: environment.apiBaseUrl,
  appName: environment.appName,
  enableMockPayments: environment.enableMockPayments,
} as const;
