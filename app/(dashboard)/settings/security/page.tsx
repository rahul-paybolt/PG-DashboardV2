"use client";
import { CustomButton } from '@/lib/components/ButtonComponent/CustomButton';
import UpdatePassword from '@/lib/components/UpdatePassword/Page';
import { Button, Card, CardBody, Switch } from '@nextui-org/react';
import React, { useCallback, useState } from 'react'
import { CgLock } from 'react-icons/cg';

// <UpdatePassword
        //   isOpen={openUpdatePassword}
        //   handleModal={handleOpenUpdatePassword}
// />

const Security = () => {

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal((prevState) => !prevState);
  }, []);

  const SecurityOption = ({ title, description, hasEdit = false }: { title: string, description: string, hasEdit?: boolean }) => (
    <Card className="mb-4 bg-purple-200">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold dark:text-black">{title}</h3>
              <div className="flex items-center">
                {hasEdit && (
                  <Button isIconOnly variant="light" className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 dark:text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </Button>
                )}
                <Switch  className="dark:text-black data-checked:text-purple-500 checked:text-purple-500" isDisabled/>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-black">{description}</p>
          </CardBody>
    </Card>
  );
    return (
        <div className="max-w-4xl mx-auto p-4">
          
          <Card className="bg-gradient-to-r from-purple-700 to-blue-700 text-white mb-4">
            <CardBody className="flex items-center p-6">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2">Account Security</h2>
                <p className="text-sm">
                  Secure accounts with passwords, PINs, and two-step authentication for
                  robust defense, safeguarding personal information and ensuring digital privacy
                </p>
              </div>
              <div className="ml-4">
                <CgLock size={48} />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-4 bg-purple-200">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold dark:text-black">Update your password due to security reasons</h3>
              <div className="flex items-center">
              <UpdatePassword
                isOpen={openModal}
                handleModal={handleOpenModal}
              />  
              <CustomButton className="bg-purple-500 text-white" onClick={handleOpenModal}>Update Password</CustomButton>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-black">Updating your password regularly enhances security by protecting your accounts from unauthorized access. It helps mitigate risks associated with data breaches and ensures your personal information remains secure</p>
          </CardBody>
       </Card>

          {/* <Card className="bg-purple-200">
            <CardBody className="p-6 flex items-center justify-between">
              <p className="text-xl font-semibold">Update your password due to security reasons</p>
              <UpdatePassword
                isOpen={openModal}
                handleModal={handleOpenModal}
              />  
            </CardBody>
          </Card> */}
    
          <SecurityOption
            title="Two-Factor Authentication"
            description="Enable two-factor authentication to secure your account, adding an extra layer of protection for enhanced account security"
          />
    
          <SecurityOption
            title="PIN"
            description="Enable a PIN for secure transactions, adding an extra layer of protection to ensure the safety and integrity of your financial activities"
            hasEdit
          />
    
          {/* <SecurityOption
            title="Password"
            description="Regularly changing your account password helps prevent unauthorized access, enhancing security and protecting your sensitive information"
            hasEdit
          /> */}

         
        </div>
      );
}

export default Security