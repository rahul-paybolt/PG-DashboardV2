"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { doSocialLogin } from "../actions";
import Link from "next/link";
import logo from "@public/logo/color-full.svg";
import { useState } from "react";
import { UserLogin } from "@/lib/interfaces/authentication.interface";
import { useToast } from "@/lib/components/Toast/ToastContext";
import { logInWithMobile } from "@/lib/hooks/auth-verification";
import React from "react";
import { PHONE_REGEX } from "@/shared/regular-expressions";
import CustomInput from "@/lib/components/InputContainer/Input";
import { useRouter } from "next/navigation";

const LoginForm = ({onNext} : {onNext: () => void}) => {
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { showToast } = useToast();

  const {mutate} = logInWithMobile();

  const handleSubmit = async () => {
    const userData: UserLogin = {
      mobile: mobile,
      password: password
    } 

    const isValid = userData.mobile &&
    userData.password;

    if (!isValid){
      showToast("Some field value are not valid", "error");
      return;
    }

    mutate(userData, {
      onSuccess: (data: any) => {
        const [response, error] = data;

        if (error) {
          showToast(error?.message, "error");
          return;
        }

        if(response){
          showToast(response?.message, "success");
          router.push("/home");
          return;
        }
      }
    })
  }

  const validatePhone = (value: string) => value.match(PHONE_REGEX);

  const validationState = React.useMemo(() => {
    if (mobile === "") return undefined;

    return validatePhone(mobile) ? "valid" : "invalid";
  }, [mobile]);
  
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          {/* <Button
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
          </Button> */}
          <CustomInput
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              label="Mobile Number"
              className="w-[380px] mb-6 rounded-md bg-white"
              value={mobile}
              onValueChange={setMobile}
              errorMessage={
                validationState === "invalid" &&
                "Please enter a valid mobile number"
              }
              // validationState={validationState}
              isRequired={true}
              onClear={() => setMobile("")}
              // isInvalid={validationState === "invalid"}
            />
          <CustomInput
            type="password"
            placeholder="Enter your password"
            label="Password"
            value={password}
            onValueChange={setPassword}
            isRequired={true}
            onClear={() => setPassword("")}
            className="w-[380px] mb-6 rounded-md bg-white"
          />
          <Button
            className="w-[380px] cursor-pointer bg-blue-500"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
