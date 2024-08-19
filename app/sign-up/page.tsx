"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loadScript } from "@/lib/utils/common-utils";
import { Button } from "@nextui-org/button";
import { doSocialLogin } from "../actions";

const SignUpForm = () => {
  const [value, setValue] = useState("");
  const [toggleText, setToggleText] = useState(false);
  const router = useRouter();

  const navigate = () => {
    setToggleText((prevValue) => !prevValue);
    router.push("/sign-in");
  };
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <>
      <div className="flex justify-between px-6 py-6">
        <Image
          src="/assests/images/favicon_3.png"
          height={50}
          width={50}
          alt="page not found"
          className="flex items-center justify-center h-[50px] w-[50px]"
        />
        <div className="flex gap-2">
          <span className="text-light">Already a member?</span>
          <span className="text-primary-600 cursor-pointer" onClick={navigate}>
            {toggleText ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
      <div className="self-center w-full mt-40">
        <h1
          className="text-center text-6xl font-extrabold leading-8 sm:text-3xl sm:font-semibold mb-2 cursor-pointer"
          onClick={navigate}
        >
          Sign up
        </h1>
        <p className="text-center text-md mb-5">
          Simplifying Payments &amp; Amplifying Success
        </p>
        <form
          className="flex flex-col items-center justify-center"
          action={doSocialLogin}
        >
          <Button
            className="login-with-google-btn mb-8 w-[380px] cursor-pointer"
            type="submit"
            name="action"
            value="google"
          >
            Sign up with Google
          </Button>
          <Button
            className="login-with-microsoft-btn w-[380px] cursor-pointer"
            type="submit"
            name="action"
            value="google"
          >
            Sign up with Microsoft
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
