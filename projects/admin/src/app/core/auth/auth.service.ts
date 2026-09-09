import { Injectable, signal } from "@angular/core";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  isHr: boolean;
  isActive: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  private readonly currentUser = signal<AdminUser | null>(null);

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isHrAdmin(): boolean {
    return this.currentUser()?.isHr ?? false;
  }

  user(): AdminUser | null {
    return this.currentUser();
  }

  setUser(user: AdminUser | null): void {
    this.currentUser.set(user);
  }

  logOut(): void {
    this.currentUser.set(null);
  }
}
