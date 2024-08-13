"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import React, { useState } from "react";
import CustomModal from "../ModalContainer/Modal";
import { Router } from "next/router";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import MerchantDetails from "@/app/auth/merchants/page";

interface VerifyingPopupsProps {
  title: string;
  content: string;
  isOpen: boolean;
}
const VerifyingPopus = ({ title, content, isOpen }: VerifyingPopupsProps) => {
  const [componentToRender, setComponentToRender] =
    useState<React.ReactNode>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      const openConnection = io("http://localhost:4000");
      openConnection.on("onMobileVerify", (data) => {
        if (data?.isVerified) {
          setIsVerified(true);
          setComponentToRender(<MerchantDetails />);
          router.push("/auth/merchants");
        }
      });
    }
  }, [isOpen]);

  // if (isVerified) {
  //   // Render the component when verification is successful
  //   if (!isRedirected) {
  //     setIsRedirected(true);
  //     return { componentToRender };
  //   }
  // }

  return (
    <div className="flex items-center justify-center">
      {/* <Button onPress={handleOpen}>Open Modal</Button> */}

      <Modal
        size="xl"
        isOpen={isOpen}
        // onClose={handleOpen}
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
