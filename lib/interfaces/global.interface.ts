// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type safeAny = any;
export interface PTBaseResponse {
  status: number;
}

export interface PBBaseResponse {
  message: string;
}

export interface MerchantBasicInfoResponse {
  message: string;
  statusCode: number;
  error?: string | null;
}

export interface GoogleSignInResponse {
  message: string;
  statusCode: number;
  error?: string | null;
}

export interface DataWrapper<T> {
  data: T;
}

export type ResponseWrapper<T> = DataWrapper<T> & PTBaseResponse;

export enum LocalStorageKeys {
  AUTHENTICATED_USER = "oa_user",
  META = "meta",
}

export interface generateQRCodeResponse {
  qrCode: string;
  message: string;
  error: string;
}

export interface UserLogInResponse {
  message: string;
  statusCode: number;
  error?: string | null;
}