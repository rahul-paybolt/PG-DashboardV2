"use client";

import React, { useState } from "react";
import Input from "@/components/InputContainer/Input";
import CustomSelect from "@/components/SelectOptions/SelectOptions";
import axios from "axios";
import { AuthenticatedUser } from "@/interfaces/authentication.interface";
import { Button } from "@nextui-org/button";
import { DesignationOptions } from "@/constants/RegisterForm/RegisterForm.constants";
import { AuthStore } from "@/store/auth-store";
import VerifyingPopus from "@/components/VerifyingPopups/VerifyingPopus";
const UsersBasicDetails = () => {
  const [name, setName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [designationType, setDesignationType] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [verifyModal, setVerifyModal] = useState(false);

  const { data, setData, resetData } = AuthStore();

  console.log("data", data);

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
    try {
      setData({ ...merchantInfoData });
      const res = await submitMerchantInfo(merchantInfoData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const submitMerchantInfo = async (data: AuthenticatedUser) => {
    console.log("receiving-data during api call", data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/users/send-magic-link`,
        data
      );
      // if (typeof window !== "undefined") {
      //   localStorage.removeItem("email");
      // }
      console.log("res", response);
      if (response) {
        setVerifyModal(true);
      }

      return response;
    } catch (err) {
      console.error("Error during API call", err);
      throw err;
    }
  };

  return (
    <>
      <VerifyingPopus
        title="Verifying otp"
        content="Wait for minutes"
        isOpen={verifyModal}
      />

      <div className="flex flex-col items-center text-center justify-center min-h-screen">
        <div className="flex flex-col px-8 py-6">
          <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold mb-4">
            Enter your Personal Information
          </h1>

          <div className="flex flex-col mb-4">
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              label="Name"
              className="w-full mb-4"
              inputValue={name}
              onValueChange={setName}
            />
            <Input
              type="text"
              name="businessName"
              placeholder="Enter your business name"
              label="Business Name"
              className="w-full mb-4"
              inputValue={businessName}
              onValueChange={setBusinessName}
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
            />
            <Input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              label="Mobile Number"
              className="w-full"
              inputValue={mobile}
              onValueChange={setMobile}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Button
              className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersBasicDetails;
