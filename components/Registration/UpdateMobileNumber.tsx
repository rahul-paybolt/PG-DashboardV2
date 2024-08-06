import React, { useEffect, useState } from "react";
import Input from "../InputContainer/Input";

interface VerifyOTPFormProps {
  nextStep: () => void;
  prevStep: () => void;
}
const UpdateMobileNumber = ({ nextStep, prevStep }: VerifyOTPFormProps) => {
  const [otp, setOtp] = useState("");
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [focusIndex, setFocusIndex] = useState(0);
  const noOfInputs = 6;

  const handlePaste = (event: React.ClipboardEvent, index: number) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text");
    const otpValuesCopy = [...otpValues];
    otpValuesCopy[index] = pastedValue;
    setOtpValues(otpValuesCopy);
  };

  const handleKeyUp = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        setFocusIndex(index - 1);
      }
    } else if (event.key === "ArrowRight") {
      if (index < noOfInputs - 1) {
        setFocusIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const otpValuesCopy = [...otpValues];
      otpValuesCopy[index] = "";
      setOtpValues(otpValuesCopy);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.target.value.length === 1) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".otp-input");
    if (inputs[focusIndex]) {
      inputs[focusIndex].focus();
    }
  }, [focusIndex]);

  const handleSubmit = () => {
    // e.preventDefault();
    // Here you would typically verify the OTP
    nextStep();
  };

  const handleCancel = () => {
    prevStep();
  };

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen">
      <div className="flex flex-col px-8 py-6">
        <h1 className="text-[80px] font-extrabold sm:text-3xl sm:font-semibold mb-4">
          Update phone number
        </h1>
        <p className="mb-2 text-base leading-6 sm:text-md">
          Stay up-to-date with important alerts by updating your number
        </p>
        <Input
          isRequired
          label="Mobile Number"
          type="number"
          name="phoneNumber"
          placeholder="Enter your mobile number"
          onChange={(e) => console.log(e)}
          startContent={"+91"}
          errorMessage="Please eneter your mobile number"
          className="w-full "
        />
        <div className="flex flex-col gap-4 mt-4 mb-4">
          <button
            className="bg-primary-600  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmit}
          >
            Next
          </button>

          <button
            className=" text-primary-600 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMobileNumber;
