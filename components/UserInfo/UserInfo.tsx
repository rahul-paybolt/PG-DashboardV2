import SelectOptionsData from "@/constants/dropdownConstants/SelectOptionData";
import React, { useEffect, useState } from "react";
import Input from "@/components/InputContainer/Input";
import CustomSelect from "@/components/SelectOptions/SelectOptions";
import axios from "axios";
import { authUserStore } from "@/store/auth-store";
import { MerchantBaseProps } from "@/interfaces/Register/register-interface";
import { useStore } from "@tanstack/react-store";
import { AuthenticatedUser } from "@/interfaces/authentication.interface";

const UsersBasicDetails = () => {
  const [name, setSelectedName] = useState<string>("");
  const [businessName, setSelectedBusinessName] = useState<string>("");
  const [designationType, setDesignationType] = useState<string| null>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const useAuthUser = () => {
    const store = useStore(authUserStore);
    return {
      designation: store.designation,
      mobile: store.mobile,
      businessName: store.businessName,
      email: store.email,
      emailVerified: store.emailVerified,
      fullName: store.fullName,
      image: store.image,
      is2FAEnabled: store.is2FAEnabled,
    };
  };

  const handleSubmit = async () => {
    authUserStore.setState((prev) => ({
      ...prev,
      name,
      businessName,
      designationType,
      mobileNumber,
    }));

    const {
      designation,
      mobile,
      businessName,
      email,
      emailVerified,
      fullName,
      image,
      is2FAEnabled,
    } = useAuthUser();

    const res = await submitMerchantInfo({
      designation,
      mobile,
      businessName,
      email,
      emailVerified,
      fullName,
      image,
      is2FAEnabled,
    });
    if (res) {
      console.log(res);
    }
  };

  const submitMerchantInfo = async (data: AuthenticatedUser) => {
    console.log("receiving-data during api call", data);
    return await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/users/send-magic-link`,
        {
          ...data,
        }
      )
      .then((res) => {
        console.log("res", res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen">
      <div className="flex flex-col px-8 py-6">
        <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold mb-4">
          Enter your Personal Information
        </h1>
        <div className=" flex flex-col mb-4 ">
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            label="Name"
            className="w-full mb-4"
            onValueChange={setSelectedName}
          />
          <Input
            type="text"
            name="business_name"
            placeholder="Enter your business name"
            label="Business Name"
            className="w-full mb-4"
            onValueChange={setSelectedBusinessName}
          />

          <CustomSelect
            label="Designation"
            placeholder="Select your designation"
            value={designationType}
            onChange={setDesignationType}
            selectionData={SelectOptionsData}
            classNames={{
              label: "text-secondary",
              mainWrapper:
                "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[470px] mb-4 ",
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
            name="mobile_no"
            placeholder="Enter your mobile number"
            label="Mobile Number"
            className="w-full"
            onValueChange={setMobileNumber}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersBasicDetails;
