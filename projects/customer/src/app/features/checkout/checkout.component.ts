import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Checkout"
      [description]="'Rent ID: ' + rentId + '.Mock payment with polling and retry.'"
    />
  `
})
export class CheckoutComponent {
  private readonly route = inject(ActivatedRoute);
  readonly rentId = this.route.snapshot.paramMap.get('rentId');
}
