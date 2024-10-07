// import CustomInput from "@/lib/components/InputContainer/Input";
// import {CustomButton} from "@/lib/components/ButtonComponent/CustomButton";
// import CustomSelect, { SelectionDataProps } from "@/lib/components/SelectOptions/SelectOptions";
// import { IndustryTypes } from "@/lib/constants/RegisterForm/RegisterForm.constants";
// import { useState } from "react";

// const PersonalInformation = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
//   const [businessType, setBusinessType] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     // Make API call
//     const response = await fetch('/api/kyc/personal-information', {
//       method: 'POST',
//       // Add necessary headers and body
//     });

//     if (response.ok) {
//       onNext();
//     } else {
//       // Handle error
//     }
//     onNext();
//   };

//   const handleSelectBusinessTypes = (value: string) => {
//     setBusinessType(value);
//   };

//   return (
//     <div className="flex flex-col items-center w-full">
//       <CustomInput label="PAN Number" className="w-full bg-white dark:text-white  mb-4" />
//       <CustomInput label="Business Email" className="w-full bg-white dark:text-white mb-4" />
//       {/* <CustomInput label="Business Type" className="w-full bg-white dark:text-white mb-4" /> */}
//       <CustomSelect
//             label="Business type"
//             value={businessType}
//             onChange={value => handleSelectBusinessTypes(value)}
//             selectionData={IndustryTypes as SelectionDataProps[]}
//             classNames={{
//               label: "text-secondary",
//               mainWrapper:
//                 "bg-white dark:bg-white shadow-md rounded-xl w-full mb-4 ",
//               innerWrapper:
//                 "bg-white dark:bg-white hover:border-none hover:bg-white dark:hover:bg-white focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
//               listboxWrapper: "border-none",
//               trigger: "border-none",
//             }}
//             variant="bordered"
//           />
//       <div className="flex justify-between mt-4 w-full">
//         <CustomButton onClick={onSkip} className="border border-primary-600">Skip</CustomButton>
//         <CustomButton onClick={handleSubmit} className="border border-primary-600">Next</CustomButton>
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;


const PersonalInformation = () => {
  return (
    <div>
      PersonalInformation
    </div>
  )
}

export default PersonalInformation;