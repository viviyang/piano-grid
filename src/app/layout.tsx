import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_NAME,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  icons: { icon: "data:," },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
