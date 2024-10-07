"use client";
// import { MerchantDetailsProps, UserDetailsProps } from "@/lib/interfaces/register-interface";
// import {
//   generateQrCode,
//   loginWithGoogle,
//   signUpWithGoogle,
//   submitMerchantBasicInfo,
//   submitMerchantDetails,
//   submitUserDetails,
// } from "@/lib/services/auth-service";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  AuthenticatedUser,
  changePasswordRequest,
  GenrateQRCodeRequest,
  LoginRequest,
} from "../interfaces/authentication.interface";
import {
  generateQRCodeResponse,
  safeAny,
} from "../interfaces/global.interface";
import { changePassword, loginUser, logoutUser } from "../services/auth-service";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";

// export const useVerifyToken = (provider: string, token: string) => {
//   const { refetch } = useQuery({
//     queryKey: ["gAuth"],
//     queryFn: () => signUpWithGoogle(provider, token),
//     enabled: false,
//   });
//   return { refetch };
// };

// export const submitMerchantInfoSubmission = () => {
//   return useMutation({
//     mutationFn: (data: AuthenticatedUser) => {
//       return submitMerchantBasicInfo(data);
//     },
//   });
// };

// export const merchantDetailsSubmission = () => {
//   return useMutation({
//     mutationFn: (data: MerchantDetailsProps) => {
//       return submitMerchantDetails(data);
//     },
//   });
// };

// export const generateQRCodeLink = (email: string | null | undefined) => {
//   return useQuery({
//     queryKey: ["Qr-link"],
//     queryFn: () => generateQrCode(email),
//   });
// };

// export const signInwithGoogle = () => {
//   return useMutation({
//     mutationFn: (data: LoginRequest) => {
//       return loginWithGoogle(data);
//     },
//   });
// };

// export const logInWithMobile = () => {
//   return useMutation({
//     mutationFn: (data: UserDetailsProps) => {
//       return submitUserDetails(data);
//     }
//   })
// }


export const useLogin = () =>{
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return loginUser(data);
    }
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return logoutUser(data);
    }
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: changePasswordRequest) => {
      return changePassword(data);
    }
  })
}
