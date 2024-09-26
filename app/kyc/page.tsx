"use client";
import { useState } from "react";
import UsersBasicDetails from "../auth/merchant-info/page";
import MerchantDetails from "../auth/merchants/page";
import PersonalInformation from "./steps/PersonalInformation";
import AadhaarNumber from "./steps/AadhaarNumber";
import OTPVerification from "./steps/OTPVerification";
import DocumentUpload from "./steps/DocumentUpload";
import Completion from "./steps/Completion";
import { useRouter } from "next/navigation";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


const steps = [
  "User Basic Details",
  "Merchant Details",
  "Personal Information",
  "Aadhaar Number",
  "OTP Verification",
  "Document Upload",
  "Completion",
];

const KYCPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSkip = () => {
    // Navigate to home page
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl flex items-start justify-start text-left font-bold mb-8">Step {currentStep + 1} {" "} : {" "}{steps[currentStep]}</h2>
      <div className="flex items-center gap-4 mb-8">
            <Dropdown className="border-none">
            <DropdownTrigger>
                <Button 
                variant="bordered" 
                className=" border-primary-600 text-black"
                >
                There are only five steps and below documents are required to complete the KYC process.
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="pan">PAN</DropdownItem>
                <DropdownItem key="adhaar">Aadhaar</DropdownItem>
                <DropdownItem key="business_pan">Business PAN</DropdownItem>
                {/* <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
                </DropdownItem> */}
            </DropdownMenu>
            </Dropdown>
      </div>
      {currentStep === 0 && <UsersBasicDetails onNext={handleNext} />}
      {currentStep === 1 && <MerchantDetails onNext={handleNext} />}
      {currentStep === 2 && <PersonalInformation onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 3 && <AadhaarNumber onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 4 && <OTPVerification onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 5 && <DocumentUpload onNext={handleNext} onSkip={handleSkip} />}
      {currentStep === 6 && <Completion onSkip={handleSkip} />}
    </div>
  );
};

export default KYCPage;