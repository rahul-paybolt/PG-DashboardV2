"use client";
import CustomSelect from "@/components/SelectOptions/SelectOptions";
import {
  businessTypes,
  DesignationOptions,
  IndustryTypes,
  Turnover_list,
} from "@/constants/RegisterForm/RegisterForm.constants";
import { merchantDetailsSubmission } from "@/hooks/useVerifyToken";
import { MerchantDetailsProps } from "@/interfaces/Register/register-interface";
// import AuthenticatedUser from "@/utils/auth-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MerchantDetails = () => {
  const [selectedEntitty, setSelectedEntity] = useState<number>();
  const [businessType, setBusinessType] = useState<number>();
  const [turnOver, setTurnOver] = useState<number>();
  const router = useRouter();

  const handleSlectedEntity = (value: number) => {
    setSelectedEntity(value);
  };

  const handleSelectBusinessTypes = (value: number) => {
    setBusinessType(value);
  };

  const handleTurnOver = (value: number) => {
    setTurnOver(value);
  };

  const { mutate, isError, isSuccess } = merchantDetailsSubmission();

  const handleSubmitMerchantDetails = () => {
    console.log(typeof selectedEntitty, typeof businessType, typeof turnOver);
    const data: MerchantDetailsProps = {
      email: window.localStorage.getItem("email"),
      businessEntityType: Number(selectedEntitty),
      industry: Number(businessType),
      turnover: Number(turnOver),
    };
    console.log("it's triggering", data);

    mutate(data);
  };

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen">
      <div className="flex flex-col px-8 py-6">
        <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold mb-4">
          Your business details
        </h1>
        <p className="mb-2 text-base leading-6 sm:text-md">
          Enhance your experience on PAYBOLT to choose your business needs.
        </p>

        <div className=" flex flex-col mb-4 ">
          <CustomSelect
            label="Entity type"
            value={selectedEntitty}
            onChange={(value) => handleSlectedEntity(value)}
            selectionData={businessTypes}
            classNames={{
              label: "text-secondary",
              mainWrapper:
                "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[480px] mb-4 ",
              innerWrapper:
                "bg-white dark:bg-default-200/60 hover:border-none hover:bg-white dark:hover:bg-default/70 focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
              listboxWrapper: "border-none",
              trigger: "border-none",
            }}
            variant="bordered"
          />
          <CustomSelect
            label="Business type"
            value={businessType}
            onChange={(value) => handleSelectBusinessTypes(value)}
            selectionData={IndustryTypes}
            classNames={{
              label: "text-secondary",
              mainWrapper:
                "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[480px] mb-4 ",
              innerWrapper:
                "bg-white dark:bg-default-200/60 hover:border-none hover:bg-white dark:hover:bg-default/70 focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
              listboxWrapper: "border-none",
              trigger: "border-none",
            }}
            variant="bordered"
          />
          <CustomSelect
            label="Annual Business Turnover"
            value={turnOver}
            onChange={(value) => handleTurnOver(value)}
            selectionData={Turnover_list}
            classNames={{
              label: "text-secondary",
              mainWrapper:
                "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[480px] mb-4 ",
              innerWrapper:
                "bg-white dark:bg-default-200/60 hover:border-none hover:bg-white dark:hover:bg-default/70 focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
              listboxWrapper: "border-none",
              trigger: "border-none",
            }}
            variant="bordered"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-primary-600 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmitMerchantDetails}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
