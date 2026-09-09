import { Injectable, signal } from '@angular/core'

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<AuthUser | null>(null);

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isEmailVerified(): boolean {
    return this.currentUser()?.emailVerified ?? false;
  }

  user(): AuthUser | null {
    return this.currentUser();
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
