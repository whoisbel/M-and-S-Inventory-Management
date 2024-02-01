"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { InventoryInputForm } from "@/components";
import { categoryFormData, harvestLogsCategoryDict } from "@/types";
import { Area, Grade } from "@prisma/client";

const HarvestLogs = () => {
  const [harvestLogs, setHarvestLogs] = useState<harvestLogsCategoryDict>({});
  useEffect(() => {
    const fetchHarvestLogs = async () => {
      const response = await fetch("/api/inventory_input/category");
      if (response.ok) {
        const { harvestLogs, grade } = await response.json();
        setHarvestLogs(harvestLogs);
      }
    };
    fetchHarvestLogs();
  }, []);

  return (
    <div className="h-full w-full bg-white text-black flex flex-col">
      <div className="bg-accent-gray py-2 px-3 flex">
        <label>Area:</label>
        <select
          name="area"
          id="area"
          className="mx-2 border-[1px] bg-white border-add-minus w-[150px]"
          onChange={(e) => {}}
        >
          <option value="Select Area" disabled>
            Select Area
          </option>
        </select>

        <label className="ml-2">Unclassified:</label>
        <input
          type="text"
          name="unclassified"
          className="mx-2 border-[1px] border-add-minus"
          readOnly
        />
      </div>
      <div className="h-full w-full  p-3 flex flex-col gap-3">
        <table border={1} align="center">
          <thead>
            <tr>
              <th>Harvest Date</th>
              <th>Area</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(harvestLogs).map((key) => {
              const harvestLog = harvestLogs[Number(key)];
              return (
                <tr key={harvestLog.id}>
                  <td>{`${harvestLog?.harvestDate}`}</td>
                  <td>{`${harvestLog?.areaName}`}</td>
                  <td>{`${harvestLog?.quantity}`}</td>
                  <td>Update/Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HarvestLogs;
