"use client";

import { Input } from "@nextui-org/input";
import React from "react";
import { SearchIcon } from "./icons";
import { Divider } from "@nextui-org/divider";
import DateRangeFilter from "./DateFilter/DateFilter";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  const getPageTitle = () => {
    switch (pathName) {
      case "/":
        return "Dashboard";
      case "/transactions":
        return "Transactions List";
      case "/analytics":
        return "Analytics";
      case "/payment":
        return "Payment";
      case "/deposits":
        return "Deposits";
      case "/history":
        return "History";
      case "/about":
        return "About";
      case "/help":
        return "Help";
      default:
        return "FeedBack";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-medium ">
        <span className="text-2xl text-primary font-semibold">
          {getPageTitle()}
        </span>
        <div className=" flex items-center gap-x-4">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[32rem] h-12",
              mainWrapper: "h-full",
              input: "text-base",
              inputWrapper:
                "h-full font-normal bg-white text-default-500 border-[1px] rounded-md",
            }}
            placeholder="Search merchant.."
            size="lg"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <DateRangeFilter />
        </div>
      </div>
      <Divider className="mb-5 dark:bg-slate-50" />
    </div>
  );
};

export default Header;
