import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-profile',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="My profile" description="Self-service admin profile edit." />
  `
})
export class ProfileComponent {}
