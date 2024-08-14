export interface AuthenticatedUser {
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
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
  email: string;
  code2FA: string;
}

export interface ResetPasswordRequest {
  login: string;
  verification_code: string;
  new_password: string;
}

export interface GoogleSignInResponse {
  is_new_user: number;
  status: number;
}

export interface GoogleUserdata {
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
  credential: string;
}
