"use client";
import { usePathname } from "next/navigation";

const GreenButton = () => {
  const pathname = usePathname();

  return (
    <div>
      <button className="bg-primary-color w-[100px] h-[35px] text-[15px] text-center text-white rounded-full">
        {pathname.includes("/admin_mngt/inventory_mngt") ? (
          <span>Update</span>
        ) : pathname.includes("/admin_mngt/users_mngt") ? (
          <span>Approve</span>
        ) : (
          <span>Save</span>
        )}
      </button>
    </div>
  );
};

export default GreenButton;
