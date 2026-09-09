import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Payment result"
      [description]="'Rent ID: ' + rentId"
    />
  `
})
export class PaymentResultComponent {
  private readonly route = inject(ActivatedRoute);
  rentId = this.route.snapshot.paramMap.get('rentId');
}
