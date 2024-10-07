export interface AuthenticatedUser {
  fullName: string;
  email: string | null;
  mobile: string;
  designation?: string | null;
  businessName?: string;
  emailVerified?: boolean;
  image?: string;
  is2FAEnabled?: boolean;
  onboardingStatus?: number;
}

export interface UserRegistration {
  fullName: string;
  email: string;
  mobile: string;
  // designation: string;
  // businessName: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  // email: string | null | undefined;
  // code2FA: string;
  // email: string;
  // password: string;
  // confirmPassword: string;
  // mobile: string;

  mobile: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}
export interface GenrateQRCodeRequest {
  email: string | null | undefined;
}

export interface ResetPasswordRequest {
  login: string;
  verification_code: string;
  new_password: string;
}

export interface UserLogin {
  mobile: string;
  password: string;
}

export interface changePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface changedResponse {
  message: string;
}