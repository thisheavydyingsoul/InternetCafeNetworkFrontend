import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-admin-list',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="Administrators" description="HR_ADMIN CRUD." />
  `
})
export class AdminListComponent {}
