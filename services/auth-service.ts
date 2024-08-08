

import { GoogleSignInResponse } from '@/interfaces/authentication.interface';

import { resolvePBApi } from '@/utils/common-utils';
import { PBBaseResponse, safeAny } from '@/interfaces/global.interface';
import axios from '@/app/api/axios';
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

export const loginWithGoogle = async (data: {
  id_token: string;
  recaptcha: string;
}): Promise<[GoogleSignInResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<GoogleSignInResponse>(
    () => axios.post<GoogleSignInResponse>(`${baseUrl}/users/verify_id`, data),
    false,
    true,
    false
  );
  return [response, error];
};

export const verifyMagicLink = async (data:): Promise<[GoogleSignInResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<GoogleSignInResponse>(
    () => axios.post<GoogleSignInResponse>(`${baseUrl}/users/verify_id`, data),
    false,
    true,
    false
  );
  return [response, error];
};



