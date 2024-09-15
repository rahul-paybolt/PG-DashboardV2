"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/lib/components/InputContainer/Input";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";

const OTPVerification = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    setOtp(pasteData);
  };

  const handleSubmit = async () => {
    // Make API call
    const response = await fetch('/api/kyc/otp-verification', {
      method: 'POST',
      // Add necessary headers and body
    });

    if (response.ok) {
      onNext();
    } else {
      // Handle error
    }
    onNext();
    
  };

  const handleResend = () => {
    // Handle resend OTP logic
    setTimer(60); // Reset timer
  };

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex space-x-2 mb-4">
        {otp.map((value, index) => (
          <CustomInput
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onPaste={handlePaste}
            className="w-10 h-10 text-center rounded"
          />
        ))}
      </div>

      <div className="flex flex-col items-start w-full mb-2 my-4 mx-4">
            <p className="text-left w-full mb-4">Don't receive OTP?</p>
            <CustomButton
                onClick={handleResend}
                className="bg-yellow-700 text-white py-2 px-4  mb-2 flex items-start mb-4"
            >
                Resend OTP
            </CustomButton>
            <p className="text-left w-full">OTP will be resent in {timer} seconds</p>
      </div>
      <div className="flex justify-between mt-4 w-full">
        <CustomButton onClick={onSkip} className="border border-primary-600">Go Back</CustomButton>
        <CustomButton onClick={handleSubmit} className="bg-primary-600">Next</CustomButton>
      </div>
    </div>
  );
};

export default OTPVerification;