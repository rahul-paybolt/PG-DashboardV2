export interface AuthenticatedUser {
  fullName: string;
  email: string | null;
  mobile: string;
  designation: string | null;
  businessName: string;
  emailVerified?: boolean;
  image?: string;
  is2FAEnabled?: boolean;
  onboardingStatus?: number;
}

export interface UserRegistration {
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  businessName: string;
}

export interface LoginRequest {
  email: string | null | undefined;
  code2FA: string;
}
export interface GenrateQRCodeRequest {
  email: string | null | undefined;
}

export interface ResetPasswordRequest {
  login: string;
  verification_code: string;
  new_password: string;
}
