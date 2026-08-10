import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJ Extimate — The Sound Beyond The Set",

  description:
    "DJ Extimate is a Nigerian DJ, producer and curator. Music, journal, upcoming events and bookings.",

  metadataBase: new URL("https://djextimate.com"),

  openGraph: {
    title: "DJ Extimate — The Sound Beyond The Set",

    description:
      "DJ, producer and curator crafting unforgettable experiences through music, energy and culture.",

    siteName: "DJ Extimate",

    type: "website",
  },

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
