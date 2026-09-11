import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'admin-game-form',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder
      title="Game form"
      [description]="gameId ? 'Edit game ' + gameId : 'Create game'"
    />
  `
})
export class GameFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly gameId = this.route.snapshot.paramMap.get('gameId');
}
