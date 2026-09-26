export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  hr: boolean;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInMs: number;
  admin: AdminProfile;
}

export interface ApiErrorBody {
  code?: string;
  message?: string;
  status?: number;
}
