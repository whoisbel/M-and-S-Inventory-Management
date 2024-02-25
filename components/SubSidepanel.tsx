"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

//not sure on this part
const SubSidepanel = () => {
const pathname = usePathname();

  // active:bg-main-background active:text-letters-color
  //h-[calc(100vh-1em)] 1em paras padding top (.5em) and bottom (.5em)
  return (
    <div className="sticky top-2 left-2 bottom-2 lg:min-w-[230px] h-full flex-col rounded-lg lg:block bg-main-background ">
      <ul className="text-[20px] flex flex-col h-full w-full px-4">
        {/* admin management here*/}
        {pathname.includes("/admin_mngt/inventory-mngt") && <>
        <Link
            className={`${
              pathname == "/admin_mngt/inventory-mngt/area_list" 
              ? " border-b-primary-color" 
              : "border-b-accent-gray "
            } h-[50px] border-b-2 pb-0 flex items-end `}
            href="/admin_mngt/inventory-mngt/area_list"
          >
            Area List
          </Link>
          <Link
            className={`${
              pathname == "/admin_mngt/inventory_mngt/grade_and_price" 
              ? "border-b-primary-color" 
              : "border-b-accent-gray "
            } h-[50px] border-b-2 pb-0 flex items-end`}
            href="/admin_mngt/inventory_mngt/grade_and_price" 
          >
            Grade and Price List
          </Link>
        </>}
        {pathname.includes("/admin_mngt/users-mngt") && <>
        <Link
            className={`${
              pathname == "/admin_mngt/users-mngt/requests" 
              ? " border-b-primary-color" 
              : "border-b-accent-gray "
            } h-[50px] border-b-2 pb-0 flex items-end `}
            href= "/admin_mngt/users-mngt/requests"
          >
            Requests
          </Link>
          <Link
            className={`${
              pathname == "/admin_mngt/users-mngt/manage_users"
              ? "border-b-primary-color" 
              : "border-b-accent-gray "
            } h-[50px] border-b-2 pb-0 flex items-end`}
            href="/admin_mngt/users-mngt/manage_users"
          >
            Manage Users
          </Link>
        </>}
          
      </ul>
    </div>
  );
};

export default SubSidepanel;
