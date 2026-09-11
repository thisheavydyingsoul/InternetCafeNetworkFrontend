import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'admin-promotion-form',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder
      title="Promotion form"
      [description]="promotionId ? 'Edit promotion ' + promotionId : 'Create promotion'"
    />
  `
})
export class PromotionFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly promotionId = this.route.snapshot.paramMap.get('promotionId');
}
