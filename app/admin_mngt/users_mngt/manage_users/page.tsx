"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";
const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  async function handleDelete(id: number) {
    const user = { id: id };
    const res = await fetch("/api/admin_mngt/users_mngt/manage_users", {
      method: "DELETE",
      body: JSON.stringify({ user }),
    });
    const { message } = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        customClass: swalCustomClass,
      }).then(() => {
        location.reload();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        customClass: swalCustomClass,
      });
    }
  }

  return (
    <div className="ml-3 pt-4 px-4  w-full border border-add-minus rounded-lg">
      <div className="flex justify-between mb-5">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className=" flex flex-col">
        <span className="text-[20px] bold border-b-4  border-primary-color">
          Manage Users
        </span>
        <div className="overflow-auto max-h-[calc(100vh-220px)] w-full">
          <AdminTable users={filteredUsers} onRedButtonClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
