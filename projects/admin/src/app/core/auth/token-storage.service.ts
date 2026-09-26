import { Injectable } from "@angular/core"
import type { AdminProfile } from "./auth.models"

const ACCESS_KEY = "admin.accessToken";
const REFRESH_KEY = "admin.refreshToken"
const PROFILE_KEY = "admin.profile";

@Injectable({ providedIn: "root"})
export class TokenStorageService {
  getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_KEY);
  }

  getProfile(): AdminProfile | null {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as AdminProfile) : null;
  }

  save(accessToken: string, refreshToken: string, profile: AdminProfile): void {
    sessionStorage.setItem(ACCESS_KEY, accessToken);
    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  hasAccessToken() : boolean {
    return !!this.getAccessToken();
  }
}
