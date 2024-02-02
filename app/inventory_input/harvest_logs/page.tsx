"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { categoryFormData, harvestLogsCategoryDict } from "@/types";
import { Area, Grade } from "@prisma/client";
import { CustomTable } from "@/components";

const HarvestLogs = () => {
  const [harvestLogs, setHarvestLogs] = useState<harvestLogsCategoryDict>({});
  const [areas, setAreas] = useState<{ description: string; id: number }[]>();
  const [dates, setDates] = useState<{ harvestDate: string }[]>();
  const [tableData, setTableData] = useState<string[][]>([]);
  const [areaFilter, setAreaFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchHarvestLogs = async () => {
      const response = await fetch("/api/inventory_input/category");
      if (response.ok) {
        const { harvestLogs, areas, dates } = await response.json();
        setHarvestLogs(harvestLogs);
        setAreas(areas);
        setDates(dates);
      }
    };
    fetchHarvestLogs();
  }, []);

  useEffect(() => {
    //update the table data when harvest logf is re rendered
    setTableData(getDefaultData());
  }, [harvestLogs]);

  useEffect(() => {
    filterData();
  }, [areaFilter, dateFilter]);

  function getDefaultData() {
    const defaultTableData: string[][] = [];
    console.log(harvestLogs);
    Object.keys(harvestLogs).map((key) => {
      const harvestLog = harvestLogs[Number(key)];

      const tableRow = [
        String(harvestLog.harvestDate),
        harvestLog.areaName,
        String(harvestLog.quantity),
        String("Update / Delete"),
      ];
      defaultTableData.push(tableRow);
    });
    return defaultTableData;
  }
  const filterData = () => {
    const defaultTableData = getDefaultData();
    let newTableData = defaultTableData.filter((data) => {
      if (areaFilter == "") {
        return true;
      } else {
        return data[1] == areaFilter;
      }
    });
    newTableData = newTableData.filter((data) => {
      if (dateFilter == "") {
        return true;
      } else {
        return data[0] == dateFilter;
      }
    });
    setTableData(newTableData);
  };

  const headers = ["Harvest Date", "Area", "Quantity", "Actions"];
  return (
    <div className="h-full w-full bg-white text-black flex flex-col">
      <div className="bg-accent-gray py-2 px-3 flex">
        <label htmlFor="">Sort by</label>
        <select
          name="area"
          id="area"
          className="mx-2 border-[1px] bg-white border-add-minus w-[150px]"
          onChange={(e) => {}}
        >
          <option value="Sort by" disabled>
            Sort
          </option>
        </select>
        <label>Filters:</label>
        <select
          name="area"
          id="area"
          className="mx-2 border-[1px] bg-white border-add-minus w-[150px]"
          onChange={(e) => {
            setAreaFilter(e.target.value);
          }}
        >
          <option value="">Select Area</option>
          {areas?.map((area) => (
            <option value={area.description} key={area.id}>
              {area.description}
            </option>
          ))}
        </select>
        <label>Date:</label>
        <select
          name="area"
          id="area"
          className="mx-2 border-[1px] bg-white border-add-minus w-[150px]"
          onChange={(e) => {
            setDateFilter(e.target.value);
          }}
        >
          <option value="">Select Date</option>
          {dates?.map((date, ind) => (
            <option value={date.harvestDate} key={ind}>
              {" "}
              {date.harvestDate}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full w-full  p-3 flex flex-col gap-3">
        <CustomTable headers={headers} data={tableData} />
      </div>
    </div>
  );
};

export default HarvestLogs;
