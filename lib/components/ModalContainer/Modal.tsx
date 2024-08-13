"use client";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import SelectOptionsData from "@/lib/constants/dropdownConstants/SelectOptionData";
import CustomSelect from "../SelectOptions/SelectOptions";
import { Button } from "@nextui-org/button";
import { SearchIcon } from "@/public/assests/Icon/SearchIcon";
import Input from "../InputContainer/Input";

interface CustomModalProps {
  isOpen?: boolean;
  handleModal?: () => void;
  title: string;
  content: React.ReactNode;
}
const CustomModal = ({
  isOpen,
  handleModal,
  title,
  content,
}: CustomModalProps) => {
  const [selectedMerchants, setSelectedMerchants] = useState<string | null>("");
  const handleSelection = (value: string | null) => {
    setSelectedMerchants(value);
  };

  const inputRef = useRef();

  return (
    <>
      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={handleModal}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className="text-secondary">{title}</ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <p className="text-danger-500">
                Note: Download this{" "}
                <span className="text-green-500">sample file</span> for your
                references
              </p>
              <p className=" text-secondary text-center py-2">
                Only Xls, Xlsx file can be uploded
              </p>
              <Divider className="mb-2" />
            </div>
            <div className="flex gap-8 mb-16">
              <p className="text-secondary mb-2">Bulk File Uploaded</p>
              <div className="flex items-center justify-center w-[200px]">
                {/* <Input
                  // ref={inputRef}
                  label="Upload"
                  placeholder="Upload file"
                  type="search"
                  // startContent={<SearchIcon />}
                />               */}
              </div>
              <CustomSelect
                label="Select"
                placeholder="Select Merchants"
                value={selectedMerchants}
                onChange={(value) => handleSelection(value)}
                selectionData={SelectOptionsData}
              />

              <Button color="secondary">Upload</Button>
              <Button color="danger">Reset</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
