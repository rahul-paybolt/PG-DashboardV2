"use client";
import UserInfoForm from "@/components/Registration/UserInfoForm";
import VerifyEmailForm from "@/components/Registration/UsersBasicDetails";
import VerifyPhoneOTP from "./VerifyphoneOTP";
import UpdateMobileNumber from "@/components/Registration/UpdateMobileNumber";
import React, { useState, createContext, useContext, useEffect } from "react";
import UsersBasicDetails from "@/components/Registration/UsersBasicDetails";

// Context to store user info
const UserInfoContext = createContext(null);

const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [updateMobileNumber, setUpdateMobileNumber] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
      {step === 0 && <UsersBasicDetails  />}
      {step === 1 && (
        <VerifyEmailForm nextStep={nextStep} prevStep={prevStep} />
      )}
      {!updateMobileNumber && step === 2 && (
        <VerifyPhoneOTP
          prevStep={prevStep}
          nextStep={nextStep}
          handleUpdateMobileNumber={handleUpdateMobileNumber}
          updateMobileNumber={updateMobileNumber}
        />
      )}
      {updateMobileNumber && (
        <UpdateMobileNumber prevStep={prevStep} nextStep={nextStep} />
      )}
    </UserInfoContext.Provider>
  );
};

export default RegisterForm;

export const useUserInfo = () => useContext(UserInfoContext);
