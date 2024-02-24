  "use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SubSidepanel } from "@/components";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full bg-accent-green p-3 rounded-lg">
      <div className="tab_buttons">
        <Link
          href="/admin_mngt/inventory-mngt/area_list"
          className={`${
            pathName.includes("/admin_mngt/inventory-mngt") 
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          }`}
        >
          Inventory Management
        </Link>
        <Link
          href="/admin_mngt/users-mngt"
          className={`${
            pathName.includes("/admin_mngt/users-mngt") 
              ? "bg-neutral-300 border-b-2 border-primary-color text-black"
              : "bg-neutral-200 text-neutral-800 "
          } `}
        >
          Users Management
        </Link>
      </div>
      <div className="flex p-4 h-full bg-white">
        <SubSidepanel />
      {children}
      </div>
      
    </div>
  );
}

