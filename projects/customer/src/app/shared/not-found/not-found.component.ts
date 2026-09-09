import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <h1>404</h1>
    <p>Page not found</p>
    <a mat-button routerLink="/catalog">Back to catalog</a>
  `
})
export class NotFoundComponent {}
