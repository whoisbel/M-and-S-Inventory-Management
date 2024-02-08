"use client";
import { CustomTable } from "@/components";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const [filters, setFilters] = useState({
    date: "",
    grade: "",
    status: "",
  });

  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/order_details");
      if (response.ok) {
      }
    };
    fetchData();
  }, []);
  const headers = [
    "Order Date",
    "Customer",
    "Grade",
    "Quantity",
    "Unit Price",
    "Total Price",
    "Status",
    "Loading Scedule",
    "Actions",
  ];
  const data = {
    0: [
      "06/02/2024",
      "Charles",
      "grade a",
      "quantity",
      "unit price",
      "total price",
      "status a",
      "12/10/25",
      "Update",
    ],
  };

  return (
    <div className="h-full w-full bg-white text-black">
      <div className="bg-accent-gray py-2 px-3 flex gap-2">
        <div className="flex gap-3">
          <label>Sort by:</label>
          <select name="sort-select" id="">
            <option value="select sort" disabled>
              Select Sort
            </option>
          </select>
        </div>
        <div className="flex gap-3">
          <label>Filters:</label>
          <select className="w min-w-[150px]">
            <option value="Date" disabled>
              Date
            </option>
          </select>
          <select className="w min-w-[150px]">
            <option value="Grade" disabled>
              Grade
            </option>
          </select>
          <select className="w min-w-[150px]">
            <option value="Status" disabled>
              Status
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col p-3 bg-white">
        <CustomTable headers={headers} data={data} />
      </div>
    </div>
  );
};

export default OrderDetails;
