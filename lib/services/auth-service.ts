import {
  AuthenticatedUser,
  GoogleSignInResponse,
} from "@/lib/interfaces/authentication.interface";

import { resolvePBApi } from "@/lib/utils/common-utils";
import { PBBaseResponse, safeAny } from "@/lib/interfaces/global.interface";
import axios from "@/app/api/axios";
import { MerchantDetailsProps } from "@/lib/interfaces/Register/register-interface";
import {
  LocalStorageKeys,
  persistToLocalStorage,
} from "../utils/localStorage-utils";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const loginUser = async (request: LoginRequest): Promise<[LoginResponse | null, safeAny]> => {
//   const [response, error] = await resolveOAApi<LoginResponse>(
//     () => axios.post<LoginResponse>(`${baseUrl}/users/login`, request),
//     false,
//     true,
//     false
//   );

//   if (response) {
//     persistToLocalStorage(LocalStorageKeys.META, response.meta);
//   }
//   return [response, error];
// };

// export const logoutUser = async (): Promise<[OMBaseResponse | null, safeAny]> => {
//   const [response, error] = await resolveOAApi<OMBaseResponse>(() => axios.post<OMBaseResponse>(`${baseUrl}/users/logout`, {}), true);
//   removeFromLocalStorage(LocalStorageKeys.META);
//   return [response, error];
// };

export const googleSignUp = async (): Promise<
  [PBBaseResponse | null, safeAny]
> => {
  const [response, error] = await resolvePBApi<PBBaseResponse>(
    () => axios.get<PBBaseResponse>(`${baseUrl}/api/v1/auth/users/google`),
    false,
    true,
    false
  );

  return [response, error];
};

export const signUpWithGoogle = async (
  provider: string,
  token: string
): Promise<[AuthenticatedUser | null, safeAny]> => {
  console.log("provider", provider, "token", token);
  const [response, error] = await resolvePBApi<AuthenticatedUser>(
    () =>
      axios.get<AuthenticatedUser>(
        `${baseUrl}/api/v1/auth/users/verify-token/${provider}?token=${token}`
      ),
    false,
    true,
    false
  );

  if (response) {
    persistToLocalStorage(LocalStorageKeys.AUTHENTICATED_USER, response);
  }
  return [response, error];
};

export const verifyMagicLink = async (
  data: safeAny
): Promise<[GoogleSignInResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<GoogleSignInResponse>(
    () => axios.post<GoogleSignInResponse>(`${baseUrl}/users/verify_id`, data),
    false,
    true,
    false
  );
  return [response, error];
};

export const submitMerchantDetails = async (
  data: MerchantDetailsProps
): Promise<[PBBaseResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<PBBaseResponse>(
    () =>
      axios.post<PBBaseResponse>(
        `${baseUrl}/api/v1/users/business-details`,
        data
      ),
    false,
    true,
    false
  );
  return [response, error];
};

export const generateQrCode = async (
  email: string
): Promise<[PBBaseResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<PBBaseResponse>(
    () =>
      axios.post<PBBaseResponse>(
        `${baseUrl}/api/v1/mf-auth/generate-qr`,
        email
      ),
    false,
    true,
    false
  );
  return [response, error];
};
