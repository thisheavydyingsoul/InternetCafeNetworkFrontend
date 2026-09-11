import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: "admin-admin-form",
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder
      title="Administrator form"
      [description]="adminId ? 'Edit administrator ' + adminId : 'Create administrator' "
    />
  `
})
export class AdminFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly adminId = this.route.snapshot.paramMap.get('adminId');
}
