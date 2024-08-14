"use client";
import { MerchantDetailsProps } from "@/lib/interfaces/register-interface";
import {
  generateQrCode,
  loginWithGoogle,
  signUpWithGoogle,
  submitMerchantDetails,
} from "@/lib/services/auth-service";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoginRequest } from "../interfaces/authentication.interface";

export const socialLogin = () => {};
export const useVerifyToken = (provider: string, token: string) => {
  const { refetch } = useQuery({
    queryKey: ["gAuth"],
    queryFn: () => signUpWithGoogle(provider, token),
    enabled: false,
  });
  return { refetch };
};

export const merchantDetailsSubmission = () => {
  return useMutation({
    mutationFn: (data: MerchantDetailsProps) => {
      return submitMerchantDetails(data);
    },
  });
};

export const generateQRCodeLink = (email: string) => {
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
