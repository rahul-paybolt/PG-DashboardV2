"use client";

import React, { useState } from "react";
import { Divider } from "@nextui-org/divider";
import { usePathname } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";
import { useTheme } from "next-themes";
import clsx from "clsx";

import DateRangeFilter from "./DateFilter/DateFilter";
import Profile from "./Profile/profile";
import { ThemeSwitch } from "./theme-switch";

const Simmer = () => {
  return (
    <div className="flex items-center justify-between p-5 h-24">
      <Skeleton className="w-32 h-12 rounded-md dark:bg-default-200" />
      <Skeleton className="w-80 h-14 rounded-md dark:bg-default-200" />
    </div>
  );
};

const Header = ({ isCollapsed }: Readonly<{ isCollapsed: boolean }>) => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const getPageTitle = () => {
    switch (pathName) {
      case "/home":
        return "Dashboard";
      case "/transactions":
        return "Collections";
      case "/payout":
        return "Payout";
      case "/analytics":
        return "Analytics";
      case "/payment":
        return "Payment";
      case "/settlements/charges":
        return "Settlements";
      case "/history":
        return "History";
      case "/settings/profile":
        return "Settings";
      case "/about":
        return "About";
      case "/docs":
        return "Docs";
      case "/account":
        return "Account";
      case "/logout":
        return "LogOut";
      case "/transactions/[id]":
        return "Merchant List";
      default:
        return "Feedback";
    }
  };

  return (
    <div className="shadow-md mb-5 border-b dark:border-primary border-secondary py-5 px-7">
      {isLoading ? (
        <Simmer />
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-2xl dark:text-primary text-secondary font-semibold">
            {getPageTitle()}
          </span>

          <div className="flex justify-center items-center gap-5">
            <ThemeSwitch />
            <div
              className={
                "w-full flex items-center gap-x-4 py-1 px-5 rounded-md text-gray-700 dark:text-gray-300 border shadow-sm bg-white dark:bg-default-100 dark:border-default-300"
              }>
              <Profile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
