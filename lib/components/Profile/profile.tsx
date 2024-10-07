"use client";
import React, { useState, useCallback } from "react";
import { User } from "@nextui-org/user";
import UpdatePassword from "../UpdatePassword/Page";
import { getUserProfiles } from "@/lib/hooks/user-profile";
import { useToast } from "../Toast/ToastContext";
import { UseQueryResult } from "@tanstack/react-query";
import { UsersApiResponse } from "@/lib/interfaces/users.interface";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CustomButton } from "../ButtonComponent/CustomButton";
import { unstable_noStore } from "next/cache";

export default function Profile() {
  unstable_noStore();
  const [logout, setLogout] = useState<boolean>(false);

  const { data } = getUserProfiles();
  const [profile] = data || [];

  const router = useRouter();

  const handleOpenUpdatePassword = useCallback(() => {
    setLogout(prevState => !prevState);
  }, []);

  return (
    <>
      <User
        name={profile?.data?.fullName}
        description={
          <>
            <span>{profile?.data?.email}</span>
          </>
        }
        avatarProps={{
          src: profile?.data.image || "/profile.png",
          className: "rounded-full h-8 w-8",
        }}
        className="cursor-pointer"
        onClick={handleOpenUpdatePassword}
      />
      {logout && (
        <CustomButton className="bg-purple-600 text-white" onClick={() => router.push("/logout")}>Logout</CustomButton>
      )}
    </>
  );
}
