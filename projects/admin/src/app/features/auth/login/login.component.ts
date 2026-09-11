import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="Admin login"/>
  `
})
export class LoginComponent {}
