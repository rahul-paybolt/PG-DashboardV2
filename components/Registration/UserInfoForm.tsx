"use client";
import Input from "@/components/InputContainer/Input";
import { EyeFilledIcon } from "@/public/assests/Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/public/assests/Icon/EyeSlashedIcon";
import { baseStyles } from "@nextui-org/theme";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  nextStep: () => void;
}
interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}
const UserInfoForm = ({ nextStep }: UserInfoProps) => {
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

  const handleSubmit = () => {
    nextStep();
  };
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
          <span className=" text-primary-600 cursor-pointer" onClick={navigate}>
            Sign In
          </span>
        </div>
      </div>
      <div className="self-center w-full mt-40  ">
        <h1
          className="text-center text-6xl font-extrabold leading-8 sm:text-3xl sm:font-semibold mb-2 cursor-pointer"
          onClick={navigate}
        >
          Sign In
        </h1>
        <p className="text-center text-md mb-5 ng-tns-c33-1 ng-star-inserted">
          Simplying Payments &amp; Amplifying Success
        </p>

        <div className=" flex flex-col items-center justify-center">
          <Button className="login-with-google-btn mb-8 w-[380px]">
            Sign up with Google
          </Button>
          <Button className="login-with-microsoft-btn w-[380px]">
            Sign up with Microsoft
          </Button>
        </div>
      </div>
      {/* register form */}
    </>
  );
};

export default UserInfoForm;
