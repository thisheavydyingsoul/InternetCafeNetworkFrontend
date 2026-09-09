import { Component, inject, OnInit } from "@angular/core";
import { PagePlaceholderComponent } from "../../../shared/page-placeholder/page-placeholder.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Verify email"
      [description]="
        token
        ? 'Will call GET /api/auth/verify-email?token=' + token
        : 'Missing verification token.'
      "
    />
  `
})
export class VerifyEmailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  token: string | null = null;

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
  }
}
