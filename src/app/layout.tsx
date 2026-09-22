import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site-config";
import { FeedbackAvailabilityProvider } from "@/components/feedback/feedback-availability";
import { getFeedbackConfig, pageFeedbackEnabled } from "@/lib/feedback/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_NAME,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FeedbackAvailabilityProvider enabled={getFeedbackConfig().enabled} pageEnabled={pageFeedbackEnabled()} productName={getFeedbackConfig().productName}>{children}</FeedbackAvailabilityProvider>
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
