"use client";
import { NextRequest } from "next/server";
import { verifyToken } from "@/hooks/auth-redirect";
import VerifyingPopus from "@/components/VerifyingPopups/VerifyingPopus";
import { transformStringFromSnakeCase } from "@/utils/common-utils";
import { AuthenticationType } from "@/enum/auth";
import { useVerifyToken } from "@/hooks/useVerifyToken";
import { useRouter } from "next/navigation";

interface AuthRouteParams {
  nextauth: string[];
}

interface AuthRouteSearchParams {
  token?: string;
  error?: string;
  x?: string;
  [key: string]: string | undefined;
}
interface AuthProviders {
  x: string;
}

interface AuthRouteRequest extends NextRequest {
  params: AuthRouteParams;
  searchParams: AuthRouteSearchParams;
  providers: AuthProviders;
}

const AuthRoute = (request: AuthRouteRequest) => {
  const { nextauth } = request.params;
  const { token } = request.searchParams;
  const { error } = request.searchParams;
  const { x } = request.searchParams;

  const router = useRouter();

  const { refetch } = useVerifyToken(nextauth[0], token ?? "");
  if (error) {
    return (
      <div>
        <VerifyingPopus
          title={transformStringFromSnakeCase(error)}
          content="Please verify your account"
          isOpen={true}
        />
      </div>
    );
  }

  if (token) {
    refetch().then((res: any) => {
      console.log("res--->", res);
      if (typeof window !== "undefined") {
        localStorage.setItem("email", res?.data?.email);
      }
      if (x && +x === AuthenticationType.SIGN_UP) {
        router.push("/merchant-info");
      } else if (x && +x === AuthenticationType.BUSINESS_DETAILS) {
        router.push("/login-2fa");
      }
    });
  }

  // const { error } = request.errorParams;
  // if (error ?? error) {
  //   return <div>Google SignUp Error; {error}</div>;
  // } else {
  // }
};

export default AuthRoute;
