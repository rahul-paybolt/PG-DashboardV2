"use client";
import Input from "@/lib/components/InputContainer/Input";
import { EyeFilledIcon } from "@/public/assests/Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/public/assests/Icon/EyeSlashedIcon";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const BasicBusinessInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);
  const navigate = () => {
    router.push("/sign-up");
  };
  return (
    <>
      {/* paybolt animation  */}
      <div className=" flex justify-between px-6 py-6">
        <Image
          src="/assests/images/favicon_3.png"
          height={50}
          width={50}
          alt="page not found"
          className="flex items-center justify-center h-[50px] w-[50px]"
        />
        <div className="flex gap-2">
          <span className=" text-light ">Already a member ?</span>{" "}
          <span className="text-primary-600 cursor-pointer" onClick={navigate}>
            Sign In
          </span>
        </div>
      </div>
      <div className="self-center w-full">
        <h1 className="text-center text-4xl font-bold sm:text-3xl sm:font-semibold mb-2 ng-tns-c33-1 ng-star-inserted">
          Sign up
        </h1>
        <p className="text-center text-sm mb-5 ng-tns-c33-1 ng-star-inserted">
          Bring your banking &amp; finance together.
        </p>
      </div>

      <div>
        <div className="py-2 px-4 flex justify-center h-12">
          <img
            className="w-5 mr-6 self-center"
            src="https://open-frontend-bucket.s3.amazonaws.com/open-money/login/google.svg"
            alt=""
          />
          <span className="text-base font-medium self-center">
            Sign up with google
          </span>
        </div>
        <div className="mt-4 mb-4 or-line relative font-semibold"></div>
        <Input
          isRequired
          type="text"
          variant={"bordered"}
          label="First Name"
          placeholder="Enter your full name"
          name="firstName"
        />
        <Input
          isRequired
          type="text"
          variant={"bordered"}
          label="Email "
          placeholder="Enter your email "
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "success"}
          errorMessage="Please enter a valid email"
          onValueChange={setValue}
          name="lastName"
        />
        <Input
          isRequired
          type="number"
          variant={"bordered"}
          label="Mobile Number"
          placeholder="Enter your mobile number"
          startContent="+91"
          name="phoneNumber"
        />
        <Input
          isRequired
          variant={"bordered"}
          label="Password"
          placeholder="password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          name="password"
        />
        <div className="flex flex-col mb-4">
          <div className="flex gap-4 mb-2">
            <Checkbox />
            <span>Send me the watsapp alert about paybolt</span>
          </div>
          <div className="flex gap-4 mb-2">
            <Checkbox />
            <span>
              I agree to Paybolt{" "}
              <span className="text-purple-600">Terms and services</span> &{" "}
              <span className="text-purple-600">Privacy and policy</span>
            </span>
          </div>
        </div>

        <Button color="primary" className="w-full">
          Sign up
        </Button>
      </div>
      {/* register form */}
    </>
  );
};

export default BasicBusinessInfo;
