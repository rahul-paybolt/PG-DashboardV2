"use client";

import React, { useState } from "react";
import Input from "@/lib/components/InputContainer/Input";
import CustomSelect from "@/lib/components/SelectOptions/SelectOptions";
import axios from "axios";
import { AuthenticatedUser } from "@/lib/interfaces/authentication.interface";
import { Button } from "@nextui-org/button";
import { DesignationOptions } from "@/lib/constants/RegisterForm/RegisterForm.constants";
import { AuthStore } from "@/store/auth-store";
import VerifyingPopus from "@/lib/components/VerifyingPopups/VerifyingPopus";
import CustomInput from "@/lib/components/InputContainer/Input";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import { NAME_REGEX, PHONE_REGEX } from "@/shared/regular-expressions";
import ErrorHandlerMessage from "@/lib/components/ErrorHandler/ErrorHandlerMessage";
import { safeAny } from "@/lib/interfaces/global.interface";
const UsersBasicDetails = () => {
  const [name, setName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [designationType, setDesignationType] = useState<string>("");
  const [mobile, setMobile] = useState<string>("91");
  const [verifyModal, setVerifyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, setData, resetData } = AuthStore();

  const getEmail = () => {
    const storedStatus = localStorage.getItem("verificationStatus");
    if (storedStatus) {
      try {
        const verificationStatus = JSON.parse(storedStatus);
        return verificationStatus.email;
      } catch (error) {}
    } else {
    }
  };
  const handleSubmit = async () => {
    const merchantInfoData: AuthenticatedUser = {
      fullName: name,
      businessName: businessName,
      designation: designationType,
      mobile: mobile,
      email: getEmail() || data?.email,
    };
    console.log("merchantInfoData", merchantInfoData);

    const isValid =
      merchantInfoData.fullName &&
      merchantInfoData.businessName &&
      merchantInfoData.designation &&
      merchantInfoData.mobile &&
      merchantInfoData.email;

    if (!isValid) {
      setErrorMessage("Some of the fields are empty");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
      return;
    }

    try {
      setData({ ...merchantInfoData });
      const res = await submitMerchantInfo(merchantInfoData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const submitMerchantInfo = async (data: AuthenticatedUser) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/users/send-magic-link`,
        data,
        { withCredentials: true }
      );
      // if (typeof window !== "undefined") {
      //   localStorage.removeItem("email");
      // }
      console.log("res", response);
      if (response) {
        setVerifyModal(true);
      }
      return response;
    } catch (err: safeAny) {
      console.log("err", err);
      setErrorMessage(err);
    }
    setErrorMessage(null);
  };

  const validatePhone = (value: string) => value.match(PHONE_REGEX);

  const validationState = React.useMemo(() => {
    if (mobile === "") return undefined;

    return validatePhone(mobile) ? "valid" : "invalid";
  }, [mobile]);
  const validate = (value: string) => value.match(NAME_REGEX);

  const validateNameSate = React.useMemo(() => {
    if (name === "") return undefined;

    return validate(name) ? "valid" : "invalid";
  }, [name]);

  return (
    <>
      {errorMessage && <ErrorHandlerMessage errorMessage={errorMessage} />}
      <VerifyingPopus
        title="Verifying otp"
        content="Wait for minutes"
        isOpen={verifyModal}
      />

      <div className="flex flex-col items-center text-center justify-center min-h-screen mx-auto my-auto ">
        <div className="flex flex-col px-8 py-6">
          <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold text-primary-600 mb-4">
            Enter your Personal Information
          </h1>

          <div className="flex flex-col mb-4">
            <CustomInput
              type="text"
              name="fullName"
              placeholder="Enter your name"
              label="Name"
              className="w-full mb-4"
              value={name}
              onValueChange={setName}
              errorMessage={
                validateNameSate === "invalid" && "Please enter a valid name"
              }
              validationState={validateNameSate}
              isRequired={true}
              onClear={() => console.log("input cleared")}
              isInvalid={validateNameSate === "invalid"}
            />
            <CustomInput
              type="text"
              name="businessName"
              placeholder="Enter your business name"
              label="Business Name"
              className="w-full mb-4"
              value={businessName}
              onValueChange={setBusinessName}
              isRequired={true}
              errorMessage={
                validateNameSate === "invalid" &&
                "Please enter a valid businessname"
              }
              validationState={validateNameSate}
              onClear={() => console.log("input cleared")}
              isInvalid={validateNameSate === "invalid"}
            />
            <CustomSelect
              label="Designation"
              placeholder="Select your designation"
              value={designationType}
              onChange={setDesignationType}
              selectionData={DesignationOptions}
              classNames={{
                label: "text-secondary",
                mainWrapper:
                  "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[430px] mb-4 ",
                innerWrapper:
                  "bg-white dark:bg-default-200/60 hover:border-none hover:bg-white dark:hover:bg-default/70 focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
                listboxWrapper: "border-none",
                trigger: "border-none",
              }}
              variant="bordered"
              name="designation"
              isRequired={true}
            />
            <CustomInput
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              label="Mobile Number"
              className="w-full"
              value={mobile}
              onValueChange={setMobile}
              errorMessage={
                validationState === "invalid" &&
                "Please enter a valid mobile number"
              }
              validationState={validationState}
              isRequired={true}
              onClear={() => console.log("input cleared")}
              isInvalid={validationState === "invalid"}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <CustomButton
              className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
              onClick={handleSubmit}
            >
              Next
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersBasicDetails;
