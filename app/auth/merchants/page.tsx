"use client";
import CustomSelect, {
  SelectionDataProps,
} from "@/lib/components/SelectOptions/SelectOptions";
import { useToast } from "@/lib/components/Toast/ToastContext";
import {
  businessTypes,
  IndustryTypes,
  Turnover_list,
} from "@/lib/constants/RegisterForm/RegisterForm.constants";
import { merchantDetailsSubmission } from "@/lib/hooks/auth-verification";
import { MerchantDetailsProps } from "@/lib/interfaces/register-interface";
import { getAuthenticatedUserDetailsFromLS } from "@/lib/utils/auth-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MerchantDetails = () => {
  const [selectedEntitty, setSelectedEntity] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [turnOver, setTurnOver] = useState<string | null>(null);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSlectedEntity = (value: string | null) => {
    setSelectedEntity(value);
  };

  const handleSelectBusinessTypes = (value: string) => {
    setBusinessType(value);
  };

  const handleTurnOver = (value: string | null) => {
    setTurnOver(value);
  };

  const { mutate } = merchantDetailsSubmission();

  const handleSubmitMerchantDetails = () => {
    const authenticatedUser = getAuthenticatedUserDetailsFromLS();

    const data: MerchantDetailsProps = {
      email: authenticatedUser?.email ?? null,
      businessEntityType: Number(selectedEntitty),
      industry: Number(businessType),
      turnover: Number(turnOver),
    };
    mutate(data, {
      onSuccess: data => {
        const [response, error] = data;
        if (error) {
          showToast("There is some issue while submitting details.", "error");
          return;
        }
        if (response) {
          showToast(`Merchant details successfully submitted`, "success");
          router.push("/kyc");
          // Ensure the home page component is properly set up
          // You may need to check if the home page route is correctly defined in your Next.js configuration
        }
      },
    });
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
            onChange={value => handleSlectedEntity(value)}
            selectionData={businessTypes as SelectionDataProps[]}
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
            onChange={value => handleSelectBusinessTypes(value)}
            selectionData={IndustryTypes as SelectionDataProps[]}
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
            onChange={(value: string | null) => handleTurnOver(value)}
            selectionData={Turnover_list as SelectionDataProps[]}
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
            onClick={handleSubmitMerchantDetails}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
