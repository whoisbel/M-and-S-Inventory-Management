"use client";
import { usePathname } from "next/navigation";

const GreenButton = ({ onClick }: { onClick: () => void }) => {
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={onClick}
        className="bg-primary-color w-full px-4 h-[35px] text-[15px] text-center text-white rounded-full hover:bg-green-hover"
      >
        {pathname.includes("/admin_mngt/inventory_mngt") ? (
          <span>Update</span>
        ) : pathname.includes("/admin_mngt/users_mngt") ? (
          <span>Approve</span>
        ) : pathname.includes("/user_settings/settings") ? (
          <span>Save Changes</span>
        ) : (
          <span>Save</span>
        )}
      </button>
    </div>
  );
};

export default GreenButton;
