import {CustomButton} from "@/lib/components/ButtonComponent/CustomButton";

const Completion = ({ onSkip }: { onSkip: () => void }) => {
  const handleFinish = () => {
    // Navigate to home page
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center w-full">
      <p>Thank you for completing the KYC process.</p>
      <div className="flex justify-between mt-4 w-full">
        <CustomButton onClick={onSkip} className="border border-primary-600">Skip</CustomButton>
        <CustomButton onClick={handleFinish} className="border border-primary-600">Finish</CustomButton>
      </div>
    </div>
  );
};

export default Completion;