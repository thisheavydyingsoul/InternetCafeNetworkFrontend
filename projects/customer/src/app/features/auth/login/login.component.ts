import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `<app-page-placeholder title="Login" />`
})
export class LoginComponent {}
