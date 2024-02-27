"use client";
import { useEffect, useState } from "react";
import { AddNewButton, SearchBar } from "@/components";
import AdminTable from "../../../../components/AdminTable";
import { Area } from "@prisma/client";

const AreaList = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    async function fetchAreas() {
      const response = await fetch("/api/admin_mngt/inventory_mngt/area_list");
      if (response.ok) {
        const data = await response.json();
        setAreas(data);
      }
    }
    fetchAreas();
  }, []);
  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
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
        <span className="text-[20px] bold">Area List</span>
        <AdminTable areas={areas} />
      </div>
    </div>
  );
};

export default AreaList;
