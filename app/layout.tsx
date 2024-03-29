import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import { Sidepanel, Provider } from "@/components";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const sansation = localFont({
  src: "../fonts/Sansation_Regular.ttf",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={sansation.className}>
        <Provider>
          {session?.user && <Sidepanel user={session.user} />}
          <div className="bg-main-background w-full  max-h-full rounded-lg ml-2 flex flex-col">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
