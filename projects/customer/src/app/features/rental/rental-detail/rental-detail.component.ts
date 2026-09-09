import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-rental-detail',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Rental details"
      [description]="'Rent ID: ' + rentId"
    />
  `
})
export class RentalDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly rentId = this.route.snapshot.paramMap.get('rentId');
}
