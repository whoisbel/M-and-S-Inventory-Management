"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SubSidepanel } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full bg-accent-green p-3 rounded-lg text-black">
      <div className="tab_buttons">
        <Link
          href="/user_settings/user_info"
          className={`${
            pathName.includes("/user_settings")
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          }`}
        >
          User Settings
        </Link>
      </div>
      <div className="flex p-4 h-full bg-white">
        <SubSidepanel />
        {children}
      </div>
    </div>
  );
}
