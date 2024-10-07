"use client";
import React, { useEffect, useRef } from "react";
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
  title?: string;
  content: React.ReactNode;
  headerClassName?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const ModalContainer = ({ isOpen, handleModal, title, content, headerClassName, size, className }: ModalContainerProps) => {
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={handleModal}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className={className}
    >
      <ModalContent>
        <ModalHeader className={headerClassName}>{title}</ModalHeader>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          {content}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
