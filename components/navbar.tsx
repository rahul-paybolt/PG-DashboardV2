import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePayments } from "react-icons/md";
import { PiHandDeposit } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";



import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import {Divider} from "@nextui-org/divider";


export const Navbar = () => {

  return (
    <>
    <NextUINavbar maxWidth="md" position="sticky"  className="absolute top-0 flex flex-col max-w-[250px] shadow-lg min-h-screen  items-start justify-start dark:shadow-lg border-r-1 bg-slate-200/10 dark:bg-gray-700">
      <NavbarContent className="flex flex-col basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-8 max-w-fit">
          <NextLink className="flex justify-start items-center gap-y-8" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="flex-col hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      {/* <NavbarContent
        className="flex mt-4 "
        justify="end"
      >
        <NavbarItem className=" flex-col hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent>
        <ThemeSwitch/>
      </NavbarContent>
      </NavbarContent>
     
    </NextUINavbar>
    </>
  );
};
