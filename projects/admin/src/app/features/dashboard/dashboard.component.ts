import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `<admin-page-placeholder title="Dashboard" />`
})
export class DashboardComponent {}
