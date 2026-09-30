import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from "./shared/language-switcher/language-switcher.component";

@Component({
  imports: [RouterOutlet, LanguageSwitcherComponent],
  selector: 'admin-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('admin');
}
