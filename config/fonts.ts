import { Fira_Code as FontMono, Lato as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
