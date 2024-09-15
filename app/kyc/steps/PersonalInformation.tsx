import CustomInput from "@/lib/components/InputContainer/Input";
import {CustomButton} from "@/lib/components/ButtonComponent/CustomButton";

const PersonalInformation = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
  const handleSubmit = async () => {
    // Make API call
    const response = await fetch('/api/kyc/personal-information', {
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

  return (
    <div className="flex flex-col items-center w-full">
      <CustomInput label="PAN Number" className="w-full mb-4" />
      <CustomInput label="Business Email" className="w-full mb-4" />
      <CustomInput label="Business Type" className="w-full mb-4" />
      <div className="flex justify-between mt-4 w-full">
        <CustomButton onClick={onSkip} className="border border-primary-600">Skip</CustomButton>
        <CustomButton onClick={handleSubmit} className="border border-primary-600">Next</CustomButton>
      </div>
    </div>
  );
};

export default PersonalInformation;