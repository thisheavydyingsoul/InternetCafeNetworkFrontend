import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-audit-log',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="Audit log"/>
  `
})
export class AuditLogComponent {}
