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
import { BsArrowRight } from "react-icons/bs";
import HelpIcon from "@/public/assests/Icon/HelpIcon";
import FeedBackIcon from "@/public/assests/Icon/FeedBackIcon";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <NextUINavbar
      maxWidth="md"
      position="sticky"
      className={clsx(
        "absolute top-0 flex flex-col max-w-[250px] shadow-lg min-h-screen items-start justify-start dark:shadow-lg border-r bg-zinc-50 dark:bg-gray-900"
      )}
    >
      <NavbarContent className="flex flex-col w-full">
        <NavbarBrand as="li" className="flex py-4 items-center">
          <NextLink className="flex items-center gap-2" href="/">
            <Image
              src="/assests/images/favicon.jpeg"
              alt="Logo"
              height={40}
              width={40}
              className="rounded-full"
            />
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              Paybolt
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="flex flex-col gap-4 justify-start w-full">
          {siteConfig.navItems.map((item) => {
            const isActive = pathName === item.href;
            return (
              <li
                key={item.href}
                className={clsx("w-full", {
                  "border border-gray-300 rounded-md bg-white dark:bg-gray-700":
                    isActive,
                })}
              >
                <NextLink href={item.href} passHref>
                  <NavbarItem
                    className={clsx(
                      "flex items-center gap-x-4 p-2 rounded-md transition-colors duration-200",
                      {
                        "text-gray-900 dark:text-white": isActive,
                        "text-gray-700 dark:text-gray-300": !isActive,
                      }
                    )}
                  >
                    <item.icon
                      className="text-gray-500 dark:text-gray-400"
                      height={24}
                      width={24}
                    />
                    <span
                      className={clsx("flex-1", {
                        "font-medium text-primary": isActive,
                      })}
                    >
                      {item.label}
                    </span>
                  </NavbarItem>
                </NextLink>
              </li>
            );
          })}
        </ul>
        <Divider />
        <ul className="flex flex-col gap-4 justify-start w-full shadow-inherit">
          <li className="w-full">
            <NextLink href="/help" passHref>
              <NavbarItem className="flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
                <HelpIcon height={24} width={24} />
                <span className="flex-1">Help</span>
              </NavbarItem>
            </NextLink>
          </li>
          <li className="w-full">
            <NextLink href="/feedback" passHref>
              <NavbarItem className="flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
                <FeedBackIcon height={24} width={24} />
                <span className="flex-1">Feedback</span>
              </NavbarItem>
            </NextLink>
          </li>
        </ul>
        <div className="mt-auto w-full px-2 ">
          <div className="flex items-center gap-x-4 max-w-fit p-2 rounded-md text-gray-700 dark:text-gray-300 border border-gray-300 shadow-sm bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2  ">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                OS
              </div>
              <div>
                <p className="font-medium">Onky Soerya</p>
                <p className="text-sm">onkyux@gmail.com</p>
              </div>
              <div className="ml-auto">
                <BsArrowRight />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
            <span>Theme</span>
            <ThemeSwitch />
          </div>
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
