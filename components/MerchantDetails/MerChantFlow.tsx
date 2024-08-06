"use client";
import UserInfoForm from "@/components/Registration/UserInfoForm";
import VerifyEmailForm from "@/components/Registration/VerifyEmailForm";
import VerifyPhoneOTP from "./VerifyphoneOTP";
import UpdateMobileNumber from "@/components/Registration/UpdateMobileNumber";
import React, { useState, createContext, useContext, useEffect } from "react";
import { MerchantBaseProps } from "@/interfaces/Register/register-interface";

// Context to store user info
const UserInfoContext = createContext(null);

const MerChantFlow = () => {
  const initialMerchantBaseState: MerchantBaseProps = {
    merchant_basic_info: {
      business_name: "",
      mob_business_types_id: null,
    },
    merchant_details: {
      is_gst_registered: false,
      industry_type: "",
      designation: "",
      annual_turnOver: "",
    },
    product_selections: {
      payout: "",
      upi_id: "",
      payment_links: "",
      explore: "",
    },
  };
  const [step, setStep] = useState(0);
  const [updateMobileNumber, setUpdateMobileNumber] = useState(false);

  const [userInfo, setUserInfo] = useState<MerchantBaseProps>(initialMerchantBaseState);


  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateUserInfo = (newInfo) => {
    setUserInfo((prev) => ({ ...prev, ...newInfo }));
  };

  const handleUpdateMobileNumber = () => {
    setUpdateMobileNumber((prevValue) => !prevValue);
  };

  useEffect(() => {
    console.log("Current Step:", step);
    console.log("Update Mobile Number:", updateMobileNumber);
  }, [step, updateMobileNumber]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        updateUserInfo,
        handleUpdateMobileNumber,
      }}
    >
      {step === 0 && <UserInfoForm nextStep={nextStep} />}
      {step === 1 && (
        <VerifyEmailForm nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 2 && (
        <VerifyPhoneOTP
          prevStep={prevStep}
          nextStep={nextStep}
          handleUpdateMobileNumber={handleUpdateMobileNumber}
          updateMobileNumber={updateMobileNumber}
        />
      )}
    </UserInfoContext.Provider>
  );
};

export default MerChantFlow;

export const useUserInfo = () => useContext(UserInfoContext);
