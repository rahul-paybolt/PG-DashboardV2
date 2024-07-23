"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Divider } from "@nextui-org/divider";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiHelpCircle } from "react-icons/fi";
import Profile from "./Profile/profile";
import { useTheme } from "next-themes";

interface NavbarProps {
  isCollapsed: boolean;
  toggleNavbar: () => void;
}

export const Navbar = ({ isCollapsed, toggleNavbar }: NavbarProps) => {
  const pathName = usePathname();
  const { theme } = useTheme();

  return (
    <div className="relative">
      <NextUINavbar
        maxWidth="md"
        position="sticky"
        className={clsx(
          "absolute top-0 flex flex-col min-h-screen items-start justify-start dark:shadow-lg border-r bg-white shadow-medium dark:bg-gray-900 transition-all duration-500",
          {
            "w-24": isCollapsed,
            "w-64": !isCollapsed,
          }
        )}>
        <NavbarContent className="flex flex-col w-full">
          <NavbarBrand as="li" className="flex py-4 items-center">
            <div className="flex items-center gap-x-4">
              <Image
                src="/assests/images/favicon_3.png"
                alt="Logo"
                height={40}
                width={40}
                className="rounded cursor-pointer"
                onClick={toggleNavbar}
              />
              {!isCollapsed && (
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  Paybolt
                </p>
              )}
            </div>
          </NavbarBrand>
          <ul className="flex flex-col gap-4 justify-start w-full">
            {siteConfig.navItems.map(item => {
              const isActive = pathName === item.href;

              return (
                <div key={item.href} className={clsx("w-full")}>
                  <NextLink href={item.href} passHref>
                    <NavbarItem
                      className={clsx(
                        "flex items-center p-2 rounded-md transition-colors duration-200 gap-x-4 text-gray-700 dark:text-gray-300",
                        {
                          "text-gray-900 dark:text-white border border-gray-300 rounded-md bg-white dark:bg-gray-700":
                            isActive,
                          "w-fit": isCollapsed,
                        }
                      )}>
                      <item.icon
                        className={
                          "text-gray-500 dark:text-gray-400 h-[24px] w-[24px]"
                        }
                      />
                      {!isCollapsed && (
                        <span
                          className={clsx("flex-1", {
                            "font-medium text-primary": isActive,
                          })}>
                          {item.label}
                        </span>
                      )}
                    </NavbarItem>
                  </NextLink>
                </div>
              );
            })}
          </ul>
          <Divider />
          <ul className="flex flex-col gap-4 justify-start w-full shadow-inherit">
            {[
              { label: "Help", link: "/help" },
              { label: "Feedback", link: "/feedback" },
            ].map(item => (
              <NextLink href={item.link} passHref key={item.label}>
                <NavbarItem className="flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
                  <FiHelpCircle className="w-[24px] h-[24px]" />
                  {!isCollapsed && <span className="flex-1">{item.label}</span>}
                </NavbarItem>
              </NextLink>
            ))}
          </ul>
          <div className="mt-auto w-full px-2 flex flex-col justify-center items-start">
            <div
              className={clsx("w-full", {
                "flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300 border border-gray-300 shadow-sm bg-white dark:bg-gray-800":
                  !isCollapsed,
              })}>
              <Profile isCollapsed={isCollapsed} />
            </div>
            <div className="mt-4 flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
              <ThemeSwitch />
              {!isCollapsed && (
                <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
              )}
            </div>
          </div>
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};
