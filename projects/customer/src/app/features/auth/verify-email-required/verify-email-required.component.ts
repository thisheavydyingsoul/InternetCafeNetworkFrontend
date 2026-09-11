import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-verify-email-required',
  standalone: true,
  imports: [PagePlaceholderComponent, RouterLink, MatButtonModule],
  template: `
    <app-page-placeholder
      title="Verify your email"
      description="Checkout is blocked until emailVerified=true."
    />
    <a mat-button routerLink="/check-email">Go to verification page</a>
  `
})
export class VerifyEmailRequiredComponent {}
