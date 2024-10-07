"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Settings = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/settings/profile");
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <p>Redirecting to profile settings...</p> {/* Optional loading message */}
        </div>
    );
}

export default Settings;
