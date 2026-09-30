import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LanguageSwitcherComponent } from "./shared/language-switcher/language-switcher.component";

@Component({
  selector: "admin-root",
  standalone: true,
  imports: [RouterOutlet, LanguageSwitcherComponent],
  template: `<header>
      <admin-language-switcher />
    </header>
    <router-outlet />`,
})
export class AppComponent {}
