export interface AuthenticatedUser {
  fullName: string;
  email?: string;
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
  login: string;
  password: string;
  recaptcha?: string;
  is_migration_required?: number;
  is_check_box?: boolean;
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
