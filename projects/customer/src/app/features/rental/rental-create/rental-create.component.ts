import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-rental-create',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `<app-page-placeholder title="Create rental" />`
})
export class RentalCreateComponent {}
