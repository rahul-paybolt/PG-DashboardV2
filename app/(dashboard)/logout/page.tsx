"use client";

import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import CustomModal from "@/lib/components/ModalContainer/Modal";
import { Button } from '@nextui-org/button';
import { useLogout } from "@/lib/hooks/auth-verification";
import { useToast } from '@/lib/components/Toast/ToastContext';

const page = () => {
    const [openLogout, setOpenLogout] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { showToast } = useToast();
    const { mutate } = useLogout();
    const signOut = () => {
        setIsLoading(true);
        mutate(undefined, {
            onSuccess: (data: any) => {
                const [response, error] = data;

                console.log(response, "response", error, "error");

                if (error) {
                    showToast(error?.message, "error");
                    setIsLoading(false);
                    return;
                }

                if (response) {
                    showToast(response?.message, "success");
                    router.push('/sign-in');
                    return;
                }
            }
        })
    };
    const handleOpenModal = () => {
        setOpenLogout((prevState) => !prevState);
    };
    const handleCloseModal = () => {
        setOpenLogout(false); 
        router.push('/'); 
    };

    const LogOutContent = () => {
        return (
            <div className='flex flex-col items-center justify-center gap-4'>
                <p className='text-center mb-4'>Are you sure you want to logout?</p>
                <div className='flex justify-end gap-4 mb-4'>
                    <Button className='bg-white text-black border border-purple-600' onClick={handleCloseModal}>Cancel</Button>
                    <Button 
                    className={`bg-purple-600 text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} 
                    onClick={isLoading ? undefined : signOut}
                    disabled={isLoading}
                >
                    {isLoading ? "Logging out..." : "Yes"}
                </Button>
                </div>
            </div>
        );
    };

    return (
        <>
            {openLogout && (
                <CustomModal
                    handleModal={handleCloseModal}
                    content={<LogOutContent />}
                    isOpen
                />
            )}
        </>
    );
};

export default page;