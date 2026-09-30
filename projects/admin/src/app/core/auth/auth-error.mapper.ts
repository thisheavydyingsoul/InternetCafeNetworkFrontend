import type { ApiErrorBody } from "./auth.models"

const CODE_TO_KEY: Record<string, string> = {
  EMAIL_NOT_VERIFIED: "auth.errors.emailNotVerified",
  GOOGLE_TOKEN_INVALID: "auth.errors.googleTokenInvalid",
  ADMIN_NOT_FOUND: "auth.errors.adminNotFound",
  ADMIN_INACTIVE: "auth.errors.adminInactive",
  GOOGLE_SUB_MISMATCH: "auth.errors.googleSubMismatch",
  INVALID_TOKEN: "auth.errors.sessionExpired",
  INVALID_REFRESH: "auth.errors.sessionExpired",
  VALIDATION_ERROR: "auth.errors.validation",
  ACCESS_DENIED: "auth.errors.accessDenied"
};

export function authErrorI18nKey(body: ApiErrorBody | null | undefined): string {
  if (body?.code && CODE_TO_KEY[body.code]) {
    return CODE_TO_KEY[body.code];
  }
  return "auth.errors.generic";
}
