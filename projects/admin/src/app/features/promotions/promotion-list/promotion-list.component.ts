import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-promotion-list',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="Promotions" />
  `
})
export class PromotionListComponent {}
