"use client"
import { GreenButton, RedButton } from ".";
import { usePathname } from "next/navigation";



const AdminTable = () => {
  const pathname = usePathname();
  return (
    <table align="left" className="admin_border rounded-none w-auto">
      <tbody >
        
          {pathname == "/admin_mngt/inventory-mngt/area_list"
          ? (
          <tr>
            <td className="body_border">Area Description</td>
            <td className="body_border">
              <div className="flex justify-end">
                <div className='mr-1'>
                <GreenButton/>
                </div>
                <div>
                <RedButton/>
                </div>
              </div>
            </td>
          </tr>
          )
        : pathname == "/admin_mngt/inventory-mngt/grade_and_price"
        ? (
          <tr>
          <td className="body_border">Price Description</td>
          <td className="body_border">Price</td>
          <td className="body_border">
            <div className="flex justify-end">
              <div className='mr-1'>
              <GreenButton/>
              </div>
              <div>
              <RedButton/>
              </div>
            </div>
          </td>
        </tr>
        )
        : pathname.includes("/admin_mngt/users-mngt")
        ? (
          <tr>
          <td className="body_border">Name</td>
          <td className="body_border">Description</td>
          <td className="body_border">
            {pathname == "/admin_mngt/users-mngt/requests"
            ? (
              <div className="flex justify-end">
              <div className='mr-1'>
              <GreenButton/>
              </div>
              <div>
              <RedButton/>
              </div>
            </div>
            )
          : (
            <div className="flex justify-end">
              <RedButton/>
            </div>
          )}
          </td>
        </tr>
        )
    : (<span>no data</span>)}



      </tbody>
    </table>
  )
}

export default AdminTable