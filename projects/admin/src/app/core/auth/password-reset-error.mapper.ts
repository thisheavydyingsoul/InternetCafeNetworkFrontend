import type { ApiErrorBody } from "./auth.models.ts"

const CODE_TO_KEY: Record<string, string> = {
  PASSWORD_RESET_TOKEN_INVALID: "auth.errors.passwordResetTokenInvalid",
  VALIDATION_ERROR: "auth.errors.validation",
}

export function passwordResetErrorI18nKey(body: ApiErrorBody | null | undefined): string {
  if (body?.code && CODE_TO_KEY[body.code]) {
    return CODE_TO_KEY[body.code];
  }
  return "auth.errors.generic";
}
