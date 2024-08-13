"use client";
import MultiFactorIcon from "@/public/assests/Icon/MultiFactorIcon";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";
import Input from "../../../components/InputContainer/Input";
import { Modal, ModalContent } from "@nextui-org/modal";
const MultFactorAuth = () => {
  console.log("called!!!!");
  const inputContainer = (src: string) => {
    const handleSubmitTwofactor = () => {};

    return (
      <div className=" flex flex-col items-center justify-center mx-20 my-20">
        <Image
          src={"/assets/images/favicon_3.png"}
          height={50}
          width={50}
          alt="page not found"
          className="mb-4"
        />
        <MultiFactorIcon height={24} width={24} className="mb-4" />
        <div className=" flex flex-col items-center justify-center mb-2 mt-4">
          <p className=" font-semibold mb-2">Authentication code</p>
          <Input
            type="text"
            placeholder="XXXXXX"
            name="input-field"
            className="mb-2"
          />
          <Button color="primary" className="mb-4">
            Verify
          </Button>
          <p className=" font-medium text-center ">
            Open your two-factor authenticator (TOTP) app or browser extension
            to view your authentication code.
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal
        size="md"
        isOpen={true}
        // onClose={handleOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        className="mb-2"
      >
        <ModalContent>
          {inputContainer("/assests/Icon/MultiFactorIcon.png")}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultFactorAuth;
