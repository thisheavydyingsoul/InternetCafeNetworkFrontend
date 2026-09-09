import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `<app-page-placeholder title="Catalog" description="Browse devices and games." />`
})
export class CatalogComponent {}
