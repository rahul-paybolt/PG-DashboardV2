"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VerifyingPopus from "@/lib/components/VerifyingPopups/VerifyingPopus";
import { transformStringFromSnakeCase } from "@/lib/utils/common-utils";
import { useVerifyToken } from "@/lib/hooks/auth-verification";
import UsersBasicDetails from "../merchant-info/page";
import { safeAny } from "@/lib/interfaces/global.interface";
import authRouteHandler from "@/lib/utils/route.utils";
import {
  LocalStorageKeys,
  persistToLocalStorage,
} from "@/lib/utils/localStorage-utils";

interface AuthRouteParams {
  nextauth: string[];
}

interface AuthRouteSearchParams {
  token?: string;
  error?: string;
  x?: string;
  [key: string]: string | undefined;
}

interface AuthRouteRequest {
  params: AuthRouteParams;
  searchParams: AuthRouteSearchParams;
}

interface verificationStatusProps {
  email: string;
  is2FAEnabled: boolean;
  onboardingStatus: number;
}

const AuthRoute = ({ params, searchParams }: AuthRouteRequest) => {
  const { nextauth } = params;
  const { token } = searchParams;
  const { error } = searchParams;
  const { x } = searchParams;
  const router = useRouter();

  const { refetch } = useVerifyToken(nextauth[0], token ?? "");
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] =
    useState<React.ReactNode>(null);

  useEffect(() => {
    if (token) {
      refetch().then((res: any) => {
        console.log("res--->", res);
        if (typeof window !== "undefined") {
          const verificationStatus = {
            email: res?.data?.email,
            is2FAEnabled: res?.data?.is2FAEnabled,
            onboardingStatus: res?.data?.onboardingStatus,
          };
          persistToLocalStorage(
            LocalStorageKeys.AUTHENTICATED_USER,
            verificationStatus
          );
        }
        const status = res?.data?.[0]?.onboardingStatus;
        console.log("status", res?.data);
        if (status === 0) {
          router.push("/auth/merchant-info");
        } else if (status === 1) {
          router.push("/auth/merchants");
        } else if (status === 2) {
          router.push("/auth/multifactor");
        } else if (status === 2) {
          router.push("/sign-in");
        }
        if (error) {
          setComponentToRender(
            <VerifyingPopus
              title={transformStringFromSnakeCase(error)}
              content="Please verify your account"
              isOpen={true}
            />
          );
        }

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner/loading component
  }

  return <>{componentToRender}</>;
};

export default AuthRoute;
