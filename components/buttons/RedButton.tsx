"use client"
import { usePathname } from "next/navigation";

const RedButton = () => {
const pathname = usePathname();
  return (
    <div>
      <button className="bg-custom-red w-[100px] h-[35px] text-[15px] text-center text-white rounded-full">
      {pathname.includes("/admin_mngt/inventory-mngt") 
      ? (<span>Delete</span>)
      : pathname.includes("/admin_mngt/users-mngt/requests")
      ? (<span>Deny</span>)
      : pathname.includes("/admin_mngt/users-mngt/manage_users")
      ? (<span>Remove</span>)  
      : (<span>Cancel</span>)
    }
      </button>
    </div>
  )
}

export default RedButton