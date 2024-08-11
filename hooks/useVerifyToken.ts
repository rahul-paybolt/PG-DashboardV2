"use client";
import { MerchantDetailsProps } from "@/interfaces/Register/register-interface";
import { submitMerchantDetails } from "@/services/auth-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useVerifyToken = (provider: string, token: string) => {
  const { refetch } = useQuery({
    queryKey: ["gAuth"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/users/verify-token/${provider}?token=${token}`
      );

      return data;
    },
  });
  return { refetch };
};

export const merchantDetailsSubmission = () => {
  return useMutation({
    mutationFn: (data: MerchantDetailsProps) => {
      console.log("data-error", data);
      return submitMerchantDetails(data);
    },
  });
};
