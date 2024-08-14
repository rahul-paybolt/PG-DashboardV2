// "use client";
import { MerchantDetailsProps } from "@/lib/interfaces/Register/register-interface";
import {
  generateQrCode,
  signUpWithGoogle,
  submitMerchantDetails,
} from "@/lib/services/auth-service";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

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
