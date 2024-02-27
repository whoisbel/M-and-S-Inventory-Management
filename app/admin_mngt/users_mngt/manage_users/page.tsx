"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/admin_mngt/users_mngt/manage_users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);
  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      <div className="flex justify-between mb-5">
        <SearchBar />
      </div>
      <div className=" flex flex-col">
        <span className="text-[20px] bold">Manage Users</span>
        <AdminTable users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
