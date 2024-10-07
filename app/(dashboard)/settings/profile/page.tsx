"use client";
import React, { useEffect, useState } from "react";
import { getUserProfiles } from "@/lib/hooks/user-profile";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Badge } from "@nextui-org/badge";
import { unstable_noStore } from "next/cache";

// Skeleton component for loading state
const ProfileSkeleton = () => (
  <Card className="bg-white dark:bg-default-100 rounded-lg shadow-lg">
    <CardBody className="p-6 animate-pulse">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4" />
          <div className="flex flex-col">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-48" />
          </div>
        </div>
        <div className="w-24 h-6 bg-gray-300 rounded" />
      </div>

      <Divider className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="h-4 bg-gray-300 rounded w-full" />
          ))}
      </div>

      <Divider className="my-4" />

      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-full mt-2" />
      </div>
    </CardBody>
  </Card>
);

const ProfilePage = () => {
  unstable_noStore();
  
  const { data, isLoading } = getUserProfiles();
  const [profile] = data || [];

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsLoadingProfile(false);
    }
  }, [isLoading]);

  const {
    fullName,
    email,
    image,
    createdAt,
    payInWebhookUrl,
    payOutWebhookUrl,
    role,
    updatedAt,
    mobile,
    kyc,
    onboardingStatus,
    accountStatus,
  } = profile?.data || {};

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-4 mx-auto my-8 px-4 w-full">
      {isLoadingProfile ? (
        <ProfileSkeleton />
      ) : (
        <Card className="bg-white dark:bg-default-100 rounded-lg shadow-lg">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar
                  src={image || "https://via.placeholder.com/150"}
                  size="lg"
                  className="mr-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{fullName}</h2>
                  <p className="text-default-500">{email}</p>
                </div>
              </div>
              <Badge content={role} color="primary" size="lg">
                {accountStatus}
              </Badge>
            </div>

            <Divider className="my-4 bg-purple-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Mobile" value={mobile || "-"} />
              <InfoItem label="KYC Status" value={kyc ? "Verified" : "Not Verified"} />
              <InfoItem label="Onboarding Status" value={onboardingStatus === 3 ? "Active Merchant" : "Verify KYC" || "-"} />
              <InfoItem label="Created At" value={formatDate(createdAt || "-")} />
              <InfoItem label="Updated At" value={formatDate(updatedAt || "-")} />
            </div>

            <Divider className="my-4 bg-purple-500" />

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Webhook URLs</h3>
              <InfoItem label="Pay In" value={payInWebhookUrl || "-"} />
              <InfoItem label="Pay Out" value={payOutWebhookUrl || "-"} />
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-2">
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

export default ProfilePage;
