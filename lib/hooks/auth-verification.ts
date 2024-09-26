"use client";
import { MerchantDetailsProps, UserDetailsProps } from "@/lib/interfaces/register-interface";
import {
  generateQrCode,
  loginWithGoogle,
  signUpWithGoogle,
  submitMerchantBasicInfo,
  submitMerchantDetails,
  submitUserDetails,
} from "@/lib/services/auth-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AuthenticatedUser,
  GenrateQRCodeRequest,
  LoginRequest,
} from "../interfaces/authentication.interface";
import {
  generateQRCodeResponse,
  safeAny,
} from "../interfaces/global.interface";

export const useVerifyToken = (provider: string, token: string) => {
  const { refetch } = useQuery({
    queryKey: ["gAuth"],
    queryFn: () => signUpWithGoogle(provider, token),
    enabled: false,
  });
  return { refetch };
};

export const submitMerchantInfoSubmission = () => {
  return useMutation({
    mutationFn: (data: AuthenticatedUser) => {
      return submitMerchantBasicInfo(data);
    },
  });
};

export const merchantDetailsSubmission = () => {
  return useMutation({
    mutationFn: (data: MerchantDetailsProps) => {
      return submitMerchantDetails(data);
    },
  });
};

export const generateQRCodeLink = (email: string | null | undefined) => {
  return useQuery({
    queryKey: ["Qr-link"],
    queryFn: () => generateQrCode(email),
  });
};

export const signInwithGoogle = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return loginWithGoogle(data);
    },
  });
};

export const logInWithMobile = () => {
  return useMutation({
    mutationFn: (data: UserDetailsProps) => {
      return submitUserDetails(data);
    }
  })
}
