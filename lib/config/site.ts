
import { VscHistory } from "react-icons/vsc";
import { GrTransaction } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { PiHandDepositBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { CgFileDocument } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";
import { AiOutlinePayCircle } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";



export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "DashBoard",
      href: "/home",
      icon: RxDashboard,
    },
    {
      label: "Collections",
      href: "/transactions",
      icon: GrTransaction,
    },
    // {
    //   label: "PayOut",
    //   href: "/payout",
    //   icon: AiOutlinePayCircle,
    // },
    {
      label: "Analytics",
      href: "/analytics",
      icon: IoAnalyticsOutline,
    },
    {
      label: "Payment",
      href: "/payment",
      icon: MdOutlinePayments,
    },
    {
      label: "Settlements",
      href: "/settlements",
      icon: FaHandshake,
      subMenu: [
        {
          href: "/settlements/charges",
          label: "Charges",
          icon: CiMoneyCheck1,
        },
        {
          href: "/settlements/settle-data",
          label: "Refunds",
          icon: PiHandDepositBold,
        },
        {
          href: "/settlements/transactions",
          label: "Transactions",
          icon: GrTransaction,
        },
      ],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: CiSettings,
    },
    {
      label: "History",
      href: "/history",
      icon: VscHistory,
    },
    // {
    //   label: "Account",
    //   href: "/account",
    //   icon: RxAvatar,
    // },
    // {
    //   label: "Docs",
    //   href: "/docs",
    //   icon: CgFileDocument,
    // },
    // {
    //   label: "Sign Out",
    //   href: "/logout",
    //   icon: TbLogout,
    // },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
};
