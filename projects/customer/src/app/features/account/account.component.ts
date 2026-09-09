import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder title="My account"/>
  `
})
export class AccountComponent{}
