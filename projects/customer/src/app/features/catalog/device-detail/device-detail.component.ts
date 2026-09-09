import { Component, inject } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Device details"
      [description]="'Device Id: ' + deviceId"
    />
  `
})
export class DeviceDetailComponent {
  private readonly route = inject(ActivatedRoute)
  readonly deviceId = this.route.snapshot.paramMap.get('deviceId')
}
