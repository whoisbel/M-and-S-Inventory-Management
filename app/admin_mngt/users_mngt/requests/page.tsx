"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";
const Requests = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  let filteredUsers = users;
  if (searchTerm) {
    const searchWords = searchTerm.toLowerCase().split(" ");
    filteredUsers = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return searchWords.every((word) => fullName.includes(word));
    });
  }
  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      <div className="flex justify-between mb-5">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className=" flex flex-col">
        <span className="text-[20px] bold border-b-4 border-primary-color">
          Requests for Approval
        </span>
        <div className="overflow-auto max-h-[550px] w-full">
          <AdminTable users={filteredUsers} />
        </div>
      </div>
    </div>
  );
};

export default Requests;
