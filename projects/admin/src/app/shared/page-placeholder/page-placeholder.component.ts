import { Component, Input } from "@angular/core";

@Component({
  selector: 'admin-page-placeholder',
  standalone: true,
  template: `
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p><em>Milestone 1 skeleton - implementation in later milestones.</em></p>
  `
})
export class PagePlaceholderComponent {
  @Input({ required: true }) title!: string;
  @Input() description = 'This page is scaffolded and ready for feature work';
}
