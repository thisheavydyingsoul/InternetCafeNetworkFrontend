import {Component, inject, output} from "@angular/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {TranslatePipe} from "../../core/i18n/translate.pipe";
import {I18nService} from "../../core/i18n/i18n.service";
import {AppLocale} from "../../core/i18n/i18n.models";

@Component({
  selector: "admin-language-switcher",
  standalone: true,
  imports: [MatButtonToggleModule, TranslatePipe],
  template: `
    <span class="label">{{ "common.language" | translate }}:</span>
    <mat-button-toggle-group
    [value]="i18n.locale()"
    (change)="onChange($event.value)"
    aria-label="Language"
    >
      @for (loc of i18n.supportedLocales(); track loc) {
        <mat-button-toggle [value]="loc">{{ loc.toUpperCase() }}</mat-button-toggle>
      }
    </mat-button-toggle-group>
  `,
  styles: [
    `
      .label {
        margin-right: 0.5rem;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly localeChange = output<AppLocale>();

  async onChange(locale: AppLocale): Promise<void> {
    await this.i18n.setLocale(locale);
    this.localeChange.emit(locale);
  }
}
