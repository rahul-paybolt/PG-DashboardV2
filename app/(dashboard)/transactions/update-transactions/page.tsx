"use client";
import CustomModal from "@/components/ModalContainer/Modal";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

const UpateTransactions = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex items-start justify-start px-4 py-4">
        <Button color="secondary" onClick={handleOpenModal}>
          Update Transactions
        </Button>
      </div>
      {openModal && (
        <CustomModal
          title="Update Transactions"
          handleModal={handleOpenModal}
          content="Hello How are you?"
          isOpen
        />
      )}
    </>
  );
};

export default UpateTransactions;
