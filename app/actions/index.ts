"use client";
import { signIn, signOut } from "@/components/auth/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export async function doSocialLogin(formData: FormData) {
  try {
    const { data: url } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/users/google`,
      {}
    );

    console.log("url", url); // Assuming the response is { url: "some-url" }
    if (url) {
      // Redirect the user to the received URL
      window.location.href = url;
    } else {
      console.error("URL not found in response");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
