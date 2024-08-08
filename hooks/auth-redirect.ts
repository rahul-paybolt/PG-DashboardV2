
"use client"
import { setAuthenticatedUser } from '@/store/auth-store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
 const verifyToken = (token: string, provider: string) => {
  const router = useRouter();
  const {data, isLoading,isPending, isSuccess} = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => {
      return axios.get(
        `http://localhost:4000/api/v1/auth/users/verify-token/${provider}?token=${token}`
      );
    },
    
    
  });
  if(isLoading){
    return null
  }
  if(data) {
    setAuthenticatedUser(data);
    router.push("/merchant-info");
  }
  return data;
};

export {
  verifyToken
};