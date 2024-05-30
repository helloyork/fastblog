import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import "./globals.css";

import { AppConfig } from "@lib/app/config/appConfig";
import Provider from "@lib/ui/provider";
import Main from "@lib/ui/components/elements/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = AppConfig.get().app.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx("h-full")}>
      <body className={clsx("h-full min-h-screen bg-background", inter.className)}>
        <Provider>
          <Main>{children}</Main>
        </Provider>
      </body>
    </html>
  );
}
