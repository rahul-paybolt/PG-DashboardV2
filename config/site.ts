import AnalyticsIcon from "@/public/assests/Icon/AnalyticsIcon";
import AvatarIcon from "@/public/assests/Icon/Avatar";
import DashBoardIcon from "@/public/assests/Icon/DashBoardIcon";
import DepositIcon from "@/public/assests/Icon/DepositIcon";
import HistoryIcon from "@/public/assests/Icon/HistoryIcon";
import PaymentIcon from "@/public/assests/Icon/Payments";
import TransactionIcons from "@/public/assests/Icon/TransactionsIcon";
import { VscHistory } from "react-icons/vsc";
import { GrTransaction } from "react-icons/gr";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { PiHandDepositBold } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { CgFileDocument } from "react-icons/cg";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "DashBoard",
      href: "/",
      icon: RxDashboard,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: GrTransaction,
    },
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
      label: "Deposit",
      href: "/deposits",
      icon: PiHandDepositBold,
    },
    {
      label: "History",
      href: "/history",
      icon: VscHistory,
    },
    {
      label: "Account",
      href: "/account",
      icon: RxAvatar,
    },
    {
      label: "Docs",
      href: "/docs",
      icon: CgFileDocument,
    },
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
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
