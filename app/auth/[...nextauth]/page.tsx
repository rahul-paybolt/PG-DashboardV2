"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { authUserStore, setAuthenticatedUser } from "@/store/auth-store";
import React from "react";
import { useStore } from "@tanstack/react-store";
import { verifyToken } from "@/hooks/auth-redirect";
type FieldToUpdate =
  | "fullName"
  | "email"
  | "mobile"
  | "designation"
  | "businessName";

interface AuthRouteParams {
  nextauth: string[];
}

interface AuthRouteSearchParams {
  token: string;
}

interface AuthRouteRequest extends NextRequest {
  params: AuthRouteParams;
  searchParams: AuthRouteSearchParams;
}

const AuthRoute = async (request: AuthRouteRequest) => {
  const { nextauth } = request.params;
  const { token } = request.searchParams;
  verifyToken(token, nextauth[0]);
};

export default AuthRoute;
