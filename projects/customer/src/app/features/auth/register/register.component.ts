import { Component } from '@angular/core';
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Register"
      description="Registration form without phone field. Email verification required before checkout."
    />
  `
})
export class RegisterComponent {}
