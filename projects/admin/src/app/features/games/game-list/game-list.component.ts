import { Component } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";

@Component({
  selector: 'admin-game-list',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder title="Games" />
  `
})
export class GameListComponent {}
