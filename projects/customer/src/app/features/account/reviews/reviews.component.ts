import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder title="My reviews"/>
  `
})
export class  ReviewsComponent{}
