"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";

import { Navbar } from "@/components/NavBar";
import Header from "@/components/Header";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="flex max-h-screen">
      <Navbar isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} />
      <div
        className={clsx("flex-1 transition-all bg-zinc-50 dark:bg-default-50", {
          "pl-24": isCollapsed,
          "pl-64": !isCollapsed,
        })}>
        <main className="h-dvh overflow-y-scroll">
          <Header isCollapsed={isCollapsed} />
          {children}
        </main>
      </div>
    </div>
  );
}
