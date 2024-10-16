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
import { siteConfig } from "@/lib/config/site";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiHelpCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { cn } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/tooltip";
import logoFull from "@/public/logo/color-full.svg";
import smallIcon from "@public/logo/paybolt-icon.png";
import { LocalStorageKeys, persistToLocalStorage } from "../utils/localStorage-utils";
import { isMerchant } from "../utils/utils";

interface SidebarProps {
  isCollapsed: boolean;
  toggleNavbar: () => void;
}

type NavItem = typeof siteConfig.navItems[number];

const filterNavItemsByRole = (navItems: NavItem[], role: string) => {
  if (isMerchant(role)) {
    return navItems.filter(item => 
      item.label === "DashBoard" ||
      item.label === "Collections" ||
      // item.label === "PayOut" ||
      // item.label === "Settlements" ||
      // item.label === "Account" ||
      // item.label === "Docs" ||
      // item.label === "Sign Out" ||
      item.label === "Settings"
    );
  }
  return navItems;
};

export const Sidebar = ({ isCollapsed, toggleNavbar }: SidebarProps) => {
  const pathName = usePathname();
  const [subMenuOpenOf, setSubMenuOpenOf] = useState("/home");
  const [role, setRole] = useState("2");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(window.location.href);
        const userRole = response.headers.get('x-user-role'); // Get role from headers
        if (userRole) {
          setRole(userRole);
          persistToLocalStorage(LocalStorageKeys.ROLE, userRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchRole();
  }, []);

  const filteredNavItems = filterNavItemsByRole(siteConfig.navItems, role);

  const toggleSubmenu = (href: string) => {
    setSubMenuOpenOf(prev => (prev === href ? "/" : href));
  };

  return (
    <div className="relative">
      <NextUINavbar
        maxWidth="md"
        position="sticky"
        className={clsx(
          "absolute top-0 flex flex-col min-h-screen items-start justify-start border-r dark:border-primary border-secondary bg-zinc-50 dark:bg-default-50 transition-all duration-500 overflow-y-auto shadow-md",
          {
            "w-24": isCollapsed,
            "w-64": !isCollapsed,
          }
        )}>
        <NavbarContent className="flex flex-col w-full">
          <NavbarBrand
            as="li"
            className="flex py-4 items-center w-full justify-start">
            <div className="flex items-center gap-x-4 h-14">
              {!isCollapsed ? (
                <Image
                  {...logoFull}
                  alt="PayBolt Logo"
                  height={56}
                  width={200}
                  className="rounded cursor-pointer"
                  onClick={toggleNavbar}
                />
              ) : (
                <Image
                  {...smallIcon}
                  alt="PayBolt Icon"
                  height={56}
                  width={30}
                  className="rounded cursor-pointer pt-2.5 pl-1"
                  onClick={toggleNavbar}
                />
              )}
            </div>
          </NavbarBrand>
          <ul className="flex flex-col gap-4 justify-start w-full">
            {filteredNavItems.map(item => {
              const isActive = pathName === item.href;
              const hasSubMenu = item?.subMenu && item.subMenu.length > 0;

              return (
                <div className={clsx("w-full")} key={item.href}>
                  <Tooltip content={item.label}>
                    <NextLink
                      href={hasSubMenu ? item.subMenu[0].href : item.href}
                      passHref
                      onClick={() => hasSubMenu && toggleSubmenu(item.href)}>
                      <NavbarItem
                        className={clsx(
                          "flex items-center p-2 rounded-md transition-colors duration-200 gap-x-4 text-gray-700 dark:text-gray-300 border border-transparent",
                          {
                            "text-gray-900 dark:text-white border-gray-300 rounded-md bg-background dark:bg-default-100 shadow":
                              isActive,
                            "w-fit": isCollapsed,
                          }
                        )}>
                        <item.icon
                          className={cn(
                            "text-gray-500 dark:text-gray-400 h-[24px] w-[24px] min-h-[24px]",
                            {
                              "text-secondary dark:text-primary": isActive,
                            }
                          )}
                        />
                        {!isCollapsed && (
                          <div
                            className={clsx(
                              "w-full flex items-center justify-between",
                              {
                                "font-medium dark:text-primary text-secondary":
                                  isActive,
                              }
                            )}>
                            <span>{item.label}</span>
                            {hasSubMenu && (
                              <FaAngleDown
                                className={cn("transition-all duration-300", {
                                  "rotate-180": subMenuOpenOf === item.href,
                                })}
                              />
                            )}
                          </div>
                        )}
                      </NavbarItem>
                    </NextLink>
                  </Tooltip>
                  {subMenuOpenOf === item.href && hasSubMenu && (
                    <div className="w-full pl-3 flex flex-col my-1">
                      {item.subMenu.map(sub => (
                        <Tooltip content={sub.label} key={sub.label}>
                          <NextLink
                            href={sub.href}
                            className={clsx(
                              "flex items-center p-2 rounded-md transition-colors duration-200 gap-x-4 text-gray-700 dark:text-gray-300 border border-transparent",
                              {
                                "text-secondary dark:text-primary !border-gray-300 rounded-md bg-white dark:bg-gray-700":
                                  pathName === sub.href,
                                "w-fit": isCollapsed,
                              }
                            )}>
                            <sub.icon
                              className={cn(
                                "text-gray-500 dark:text-gray-400 h-[24px] w-[24px]",
                                {
                                  "text-secondary dark:text-primary":
                                    pathName === sub.href,
                                }
                              )}
                            />
                            {!isCollapsed && sub.label}
                          </NextLink>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </ul>
          <Divider />
          {role !== "2" && (
            <ul className="flex flex-col gap-4 justify-start w-full shadow-inherit">
              {[
                { label: "Help", link: "/help" },
                { label: "Feedback", link: "/feedback" },
              ].map(item => (
                <Tooltip key={item.link} content={item.label}>
                  <NextLink href={item.link} passHref>
                    <NavbarItem className="flex items-center gap-x-4 p-2 rounded-md text-gray-700 dark:text-gray-300">
                      <FiHelpCircle className="w-[24px] h-[24px]" />
                      {!isCollapsed && (
                        <span className="flex-1">{item.label}</span>
                      )}
                    </NavbarItem>
                  </NextLink>
                </Tooltip>
              ))}
            </ul>
          )}
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};
