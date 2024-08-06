import { Metadata } from "next";
import { ReactNode } from "react";
import clsx from "clsx";

import { Providers } from "@/app/providers";
import { fontSans } from "@/config/fonts";
import { NavbarProvider } from "@/components/NavBarContext";

import "@/styles/globals.scss"

export const metadata: Metadata = {
  title: "PayBolt",
  description: "PayBolt Dashboard",
  icons: [
    {
      url: "/icon.png",
      type: "image/png",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background antialiased relative",
          fontSans.variable,
          fontSans.className
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <NavbarProvider>{children}</NavbarProvider>
        </Providers>
      </body>
    </html>
  );
}
