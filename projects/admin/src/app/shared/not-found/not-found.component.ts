import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'admin-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <h1>404</h1>
    <a>Page not found.</a>
    <a mat-button routerLink="/dashboard">Back to dashboard</a>
  `
})
export class NotFoundComponent {}
