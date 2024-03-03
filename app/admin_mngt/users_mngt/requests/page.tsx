"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";
const Requests = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/admin_mngt/users_mngt/requests");
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
        <span className="text-[20px] boldborder-b-4 border-primary-color">Requests for Approval</span>
        <div className="overflow-auto max-h-[550px] w-full">
        <AdminTable users={users} />
        </div>
        
      </div>
    </div>
  );
};

export default Requests;
