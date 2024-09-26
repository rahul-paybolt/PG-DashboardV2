"use client"
import { useRef, useState } from "react";
import CustomInput from "@/lib/components/InputContainer/Input";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import { MdOutlineFileUpload } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import ModalContainer from "@/lib/components/ModalContainer/Modal";

const DocumentUpload = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Add this line


  const handleOpenModal = (documentName: string) => {
    setCurrentDocument(documentName);
    setIsModalOpen(true);      
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDocument("");
  };

  const handleSubmit = async () => {
    // Make API call
    const response = await fetch('/api/kyc/document-upload', {
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

  const handleFileSelection = () => { // Add this function
    fileInputRef.current?.click();
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Add this function
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      // Handle the file upload logic here
    }
  };
  return (
    <form className="flex flex-col items-center w-full" encType="multipart/form-data">
      {["PAN", "Aadhaar", "Bank Statement", "Address Proof"].map((doc) => (
        <div key={doc} className="relative w-full mb-4">
          <CustomInput
            label={`Upload ${doc}`}
            // type="file"
            className="w-[300px] pr-10 cursor-pointer"
            readOnly
            endContent={
              <MdOutlineFileUpload
                className="cursor-pointer"
                size={24}
              />
            }
            onClick={() => handleOpenModal(doc)}
            classNames={{
              input: "cursor-pointer"
            }}
            accept=".pdf, .jpg, .jpeg, .png"
            // enctype="multipart/form-data"
          />
        </div>
      ))}
      <div className="flex justify-between mt-4 w-full">
        <CustomButton onClick={onSkip}  className="border border-primary-600">Skip</CustomButton>
        <CustomButton onClick={handleSubmit} className="border border-primary-600">Next</CustomButton>
      </div>

      {isModalOpen && (
        <ModalContainer
          isOpen={isModalOpen}
          handleModal={handleCloseModal}
          title={`Upload ${currentDocument}`}
          content={
            <div className="p-4">
              <div className="flex items-center justify-center mb-4  h-24 w-full border border-primary-600 rounded-lg">
                <CiCamera size={48} className="cursor-pointer" onClick={handleFileSelection} />
                <CustomInput
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <CustomButton className="w-full bg-primary-200 text-white mb-2">Upload</CustomButton>
            </div>
          }
        />
      )}
    </form>
  );
};

export default DocumentUpload;