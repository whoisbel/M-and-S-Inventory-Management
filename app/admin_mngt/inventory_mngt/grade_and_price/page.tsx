"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { Grade } from "@prisma/client";
import { useEffect, useState } from "react";
const GradeAndPrice = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  useEffect(() => {
    async function fetchGrades() {
      const response = await fetch(
        "/api/admin_mngt/inventory_mngt/grade_and_price"
      );
      if (response.ok) {
        const data = await response.json();
        setGrades(data);
      }
    }
    fetchGrades();
  }, []);
  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lgzzzz">
      <div className="flex justify-between mb-2">
        <div>
          {" "}
          <SearchBar />{" "}
        </div>
        <div>
          {" "}
          <AddNewButton />
        </div>
      </div>
      <div className=" flex flex-col">
        <span className="text-[20px] bold border-b-4  border-primary-color">Grade and Price List</span>
        <div className="overflow-auto max-h-[550px] w-full">
        <AdminTable grades={grades} />
        </div>
        
      </div>
    </div>
  );
};

export default GradeAndPrice;