// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type safeAny = any;
export interface PTBaseResponse {
  status: number;
}
export interface PB_RESPONSE {
  data: {
    message: string;
  }
}
export interface PBBaseResponse {
  data: {
    message: string;
  }
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
  META = "meta",
  ROLE = "role",
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