"use client";
import { usePathname } from "next/navigation";

const RedButton = ({ onClick }: { onClick: () => void }) => {
  const pathname = usePathname();
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-custom-red hover:bg-red-hover w-full px-4 h-[35px] text-[15px] text-center text-white rounded-full"
      >
        {pathname.includes("/admin_mngt/inventory_mngt/") ? (
          <span>Delete</span>
        ) : pathname.includes("/admin_mngt/users-mngt/requests") ? (
          <span>Deny</span>
        ) : pathname.includes("/admin_mngt/users_mngt/manage_users") ? (
          <span>Remove</span>
        ) : (
          <span>Cancel</span>
        )}
      </button>
    </div>
  );
};

export default RedButton;
