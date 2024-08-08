import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import React, { useState } from "react";
import CustomModal from "../ModalContainer/Modal";

interface VerifyingPopupsProps {
  title: string;
  content: string;
}
const VerifyingPopus = ({ title, content }: VerifyingPopupsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  return (
    <div className="flex items-center justify-center">
      <Button onPress={handleOpen}>Open Modal</Button>

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={handleOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        className="mb-2"
      >
        <ModalContent>
          <ModalHeader className="text-secondary">{title}</ModalHeader>
          <ModalBody>
            <div className=" flex flex-col gap-y-2">
              {content}
              <Spinner label="Loading..." color="primary" className=" mb-4" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VerifyingPopus;
