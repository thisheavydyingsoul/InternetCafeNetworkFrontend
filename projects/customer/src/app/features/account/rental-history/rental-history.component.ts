import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-rental-history',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder title="My rentals" />
  `
})
export class RentalHistoryComponent {}
