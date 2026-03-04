import "./globals.css";
import type { Metadata } from "next";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "RevoShop — Next-Gen Commerce",
  description: "Shop the future. RevoShop brings you the best products at unbeatable prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
