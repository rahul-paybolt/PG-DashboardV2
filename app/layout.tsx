"use client"
import "@/styles/globals.css";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { NavbarProvider } from "@/components/NavBarContext";
import Header from "@/components/Header";
import { Navbar } from "@/components/NavBar";
import { ReactNode, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <NavbarProvider>
            <div className="flex max-h-screen">
              <Navbar isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} />
              <div
                className={clsx("flex-1 transition-all", {
                  "pl-24": isCollapsed,
                  "pl-64": !isCollapsed,
                })}
              >
                <main>{children}</main>
              </div>
            </div>
          </NavbarProvider>
        </Providers>
      </body>
    </html>
  );
}
