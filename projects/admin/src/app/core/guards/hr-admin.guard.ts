import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";

export const hrAdminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isHrAdmin()) {
    return true;
  }

  return router.createUrlTree(['/dashboard'])
}
