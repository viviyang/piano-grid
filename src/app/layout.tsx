import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

// Foundation-stage guard only. Revisit after actual page/release acceptance.
export const metadata: Metadata = {
  title: "Piano Reference",
  robots: { index: false, follow: false },
  icons: { icon: "data:," },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
