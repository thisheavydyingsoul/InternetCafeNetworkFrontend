import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-admin-detail',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder
      title="Administrator details"
      [description]="'Admin ID: ' + adminId"
    />
  `
})
export class AdminDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly adminId = this.route.snapshot.paramMap.get('adminIn');
}
