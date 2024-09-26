"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string; 
}

const middleware = async (req: NextRequest) => {
  const id_token = req.cookies.get("atk")?.value; 

  const path = req.nextUrl.pathname;
  // const id_token = req.cookies.get("atk")?.value;

  // Define your public routes here (e.g., login, sign-up, and related routes)
  const publicRoutes =
    /^\/(login|auth|assets|login-2fa|sign-up|sign-in|merchant-info|merchants|api|_next\/static|_next\/images|favicon\.ico)/;

  // If the user is trying to access a public route, allow it
  if (publicRoutes.test(path)) {
    return NextResponse.next();
  }

  // If the user does not have an id_token, redirect them to the sign-up page
  if (!id_token) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  // If the user is already logged in and trying to access login or sign-up, redirect them to the home page
  if (
    id_token &&
    (path === "/login" || path === "/sign-up" || path === "/login-2fa")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  let decodedRole 
  

  if (id_token) {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(id_token);
      decodedRole = decodedToken.role; // Assuming the role is in the token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  // Allow the request to proceed
  const response = NextResponse.next();
  response.headers.set("x-user-role", decodedRole || "2"); // Default to "2" if role is not set

  return response;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login
     * - login-2fa
     * - sign-up
     * - merchant-info
     * - merchants
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|_next/image|favicon.ico|favicon_3.png|login|login-2fa|sign-up|merchant-info|merchants).*)",
  ],
};

export default middleware;
