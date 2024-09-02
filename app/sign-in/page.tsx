"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { doSocialLogin } from "../actions";
import Link from "next/link";
import logo from "@public/logo/color-full.svg";

const LoginForm = () => {
  return (
    <>
      <div className="flex justify-between px-6 py-6">
        <Image
          src={logo}
          height={150}
          width={150}
          alt="page not found"
          className="flex items-center justify-center"
        />
        <div className="flex gap-2">
          <Link href="/sign-up" className="text-primary">
            Create a new account?
          </Link>
        </div>
      </div>
      <div className="self-center w-full mt-40">
        <h1 className="text-center text-6xl font-extrabold leading-8 sm:text-3xl sm:font-semibold mb-2">
          Sign In
        </h1>
        <p className="text-center text-md mb-5">
          Simplifying Payments &amp; Amplifying Success
        </p>
        <form
          className="flex flex-col items-center justify-center"
          action={doSocialLogin}>
          <Button
            className="login-with-google-btn mb-8 w-[380px] cursor-pointer"
            type="submit"
            name="action"
            value="google">
            Sign In with Google
          </Button>
          <Button
            className="login-with-microsoft-btn w-[380px] cursor-pointer"
            type="submit"
            name="action"
            value="google">
            Sign In with Microsoft
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
