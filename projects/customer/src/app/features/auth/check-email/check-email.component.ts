import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-check-email',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Check your email"
      description="Shown after registration. Includes resend button with 60s rate-limit timer."
    />
  `
})
export class CheckEmailComponent {}
