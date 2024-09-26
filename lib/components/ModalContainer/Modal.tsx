"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface ModalContainerProps {
  isOpen: boolean;
  handleModal: () => void;
  title: string;
  content: React.ReactNode;
}

const ModalContainer = ({ isOpen, handleModal, title, content }: ModalContainerProps) => {
  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={handleModal}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="text-secondary">{title}</ModalHeader>
        <ModalBody>
          {content}
        </ModalBody>
        {/* <ModalFooter>
          <Button color="secondary" onClick={handleModal}>Close</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
