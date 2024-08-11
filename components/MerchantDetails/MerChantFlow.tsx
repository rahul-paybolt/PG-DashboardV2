"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import MerchantBusinessDetails from "./BusinessDetails";

// Context to store user info
const UserInfoContext = createContext(null);

const MerChantFlow = () => {
  const [step, setStep] = useState(0);
  const [updateMobileNumber, setUpdateMobileNumber] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(() => {}, [step]);

  return (
    <UserInfoContext.Provider value={{ step, nextStep, prevStep }}>
      {/* {step === 0 && <UserInfoForm nextStep={nextStep} />}
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
      )} */}
      <MerchantBusinessDetails />
    </UserInfoContext.Provider>
  );
};

export default MerChantFlow;

export const useUserInfo = () => useContext(UserInfoContext);
