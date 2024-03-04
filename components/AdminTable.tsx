"use client";
import { GreenButton, RedButton } from ".";
import { usePathname } from "next/navigation";
import { Area, Grade, User } from "@prisma/client";

const AdminTable = ({
  areas,
  grades,
  users,
  onGreenButtonClick,
  onRedButtonClick,
}: {
  areas?: Area[];
  grades?: Grade[];
  users?: User[];
  onGreenButtonClick?: (val: number) => void;
  onRedButtonClick?: (val: number) => void;
}) => {
  const pathname = usePathname();

  return (
    <table align="left" className="admin_border rounded-none w-auto">
      <tbody>
        {pathname == "/admin_mngt/inventory_mngt/area_list" ? (
          areas &&
          areas?.map((area: Area) => (
            <tr key={area.id}>
              <td className="body_border">{area.description}</td>
              <td className="body_border">
                <div className="flex justify-end">
                  <div className="mr-1">
                    <GreenButton onClick={() => onGreenButtonClick!(area.id)} />
                  </div>
                  <div>
                    <RedButton onClick={() => onRedButtonClick!(area.id)} />
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : pathname == "/admin_mngt/inventory_mngt/grade_and_price" ? (
          grades &&
          grades?.map((grade: Grade) => (
            <tr key={grade.id}>
              <td className="body_border">{grade.description}</td>
              <td className="body_border">{grade.price.toFixed(2)}</td>
              <td className="body_border">
                <div className="flex justify-end">
                  <div className="mr-1">
                    <GreenButton
                      onClick={() => onGreenButtonClick!(grade.id)}
                    />
                  </div>
                  <div>
                    <RedButton onClick={() => onRedButtonClick!(grade.id)} />
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : pathname.includes("/admin_mngt/users_mngt") ? (
          users &&
          users.map((user: User) => (
            <tr key={user.id}>
              <td className="body_border">{`${user.firstName} ${user.lastName}`}</td>
              <td className="body_border">
                {user.isAdmin ? "Admin" : "Employee"}
              </td>
              <td className="body_border">
                {pathname == "/admin_mngt/users_mngt/requests" ? (
                  <div className="flex justify-end">
                    <div className="mr-1">
                      <GreenButton
                        onClick={() => onGreenButtonClick!(user.id)}
                      />
                    </div>
                    <div>
                      <RedButton onClick={() => onRedButtonClick!(user.id)} />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <RedButton onClick={() => onRedButtonClick!(user.id)} />
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <span>no data</span>
        )}
      </tbody>
    </table>
  );
};

export default AdminTable;
