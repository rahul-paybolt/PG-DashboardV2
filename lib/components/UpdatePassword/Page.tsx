"use client"
import React, { useState } from 'react';
import CustomInput from '../InputContainer/Input';
import { Button } from '@nextui-org/button';
import { useResetPassword } from '@/lib/hooks/generate-secretKey';
import { ResetPasswordApiRequest } from '@/lib/interfaces/reset-password.interface';
import { useToast } from '../Toast/ToastContext';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';

interface UpdatePasswordProps {
  isOpen: boolean;
  handleModal: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ isOpen, handleModal }) => {
  const { showToast } = useToast();
  const [olderPassword, setOlderPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { mutate: resetPassword } = useResetPassword();

  const handleResetPassword = () => {
    const data: ResetPasswordApiRequest = {
      oldPassword: olderPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }
    resetPassword(data, {
      onSuccess: (data) => {
        const [response, error] = data;

        console.log(response);
        if (response) {
          handleModal();
          showToast(response[0]?.data?.message, "success");
        }
        if (error) {
          showToast(error?.message, "error");
        }
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={handleModal}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-purple-600 text-center">
              Update Password
            </ModalHeader>
            <ModalBody className="flex flex-col items-center justify-center gap-4 px-8 py-6">
              <CustomInput label='Older Password' value={olderPassword} onValueChange={setOlderPassword} />
              <CustomInput label='New Password' value={newPassword} onValueChange={setNewPassword} />
              <CustomInput label='Confirm Password' value={confirmPassword} onValueChange={setConfirmPassword} />
            </ModalBody>
            <ModalFooter>
              <Button className='bg-purple-600 text-white w-full' onClick={handleResetPassword}>
                Update Password
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdatePassword;