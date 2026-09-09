import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'admin-device-form',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <admin-page-placeholder
      title="Device form"
      [description]="deviceId ? 'Edit device ' + deviceId : 'Create device'"
    />
  `
})
export class DeviceFormComponent {
  private readonly route = inject(ActivatedRoute);
  readonly deviceId = this.route.snapshot.paramMap.get('deviceId');
}
