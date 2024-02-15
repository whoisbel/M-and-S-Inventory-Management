"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  categoryFormData,
  customTableDataType,
  customTableProps,
  inventoryDataType,
} from "@/types";
import { CustomTable } from "@/components";
import { Area, Grade } from "@prisma/client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Stockout = () => {
  const [swalShown, setSwalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [area, setArea] = useState<Area[]>([]);
  const [grade, setGrade] = useState<Grade[]>([]);
  const [tableData, setTableData] = useState<customTableDataType>({});
  const [selectedUpdateData, setSelectedUpdateData] = useState<string[]>([]);
  const headers = [
    "Stockout Date",
    "Area",
    "Grade",
    "Quantity",
    "Type",
    "Actions",
  ];
  const swal = withReactContent(Swal);
  const handleUpdate = (index: number) => {
    swal.fire({
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
    setSelectedUpdateData(tableData[index]);
    console.log(swal.getHtmlContainer());
  };
  return (
    <div className="h-full w-full bg-custom-white">
      <div className="bg-accent-gray w-full gap-2 flex items-center text-letters-color">
        <div className="h-full w-full bg-white text-black">
          {/* {swalShown &&
  createPortal(
    <InventoryModal
      inventoryData={selectedUpdateData}
      swal={swal}
      grade={grade}
    />,
    swal.getHtmlContainer()!
  )} */}
          <div className="bg-accent-gray py-2  px-3 flex gap-2 w-full h-max">
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
              <select
                className="w min-w-[150px]"
                defaultValue=""
                onChange={(e) => {
                  {
                    /*setFilter({ ...filter, dateFilter: e.target.value });*/
                  }
                }}
              >
                <option value="">Date</option>
                {/* {dates.map((date, ind) => (
        <option key={ind} value={date.harvestDate}>
          {date.harvestDate}
        </option>
      ))} */}
              </select>
              <select
                className="w min-w-[150px]"
                defaultValue=""
                onChange={(e) => {
                  {
                    /*setFilter({ ...filter, dateFilter: e.target.value });*/
                  }
                }}
              >
                <option value="">Grade</option>
                {grade.map((g, ind) => (
                  <option key={ind} value={g.description}>
                    {g.description}
                  </option>
                ))}
              </select>
              <select
                className="w min-w-[150px]"
                onChange={(e) => {
                  {
                    /*setFilter({ ...filter, dateFilter: e.target.value });*/
                  }
                }}
              >
                <option value="">Area</option>
                {area.map((area, ind) => (
                  <option key={ind} value={area.description}>
                    {area.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex justify-end items-center ">
              <input
                type="text"
                name="search"
                id="search"
                className="rounded-lg placeholder:pl-2"
                placeholder="Search"
              />
              <BiSearch className="-ml-[1.25em] text-primary-color" />
            </div>
          </div>
          <div className="w-full flex justify-end p-4 self-end">
            <button className="generate-report-button mr-8">
              Create Stockout +
            </button>
            <button className="generate-report-button">
              Generate Report +
            </button>
          </div>
          <div className="flex flex-col p-3 bg-custom-white">
            <CustomTable
              headers={headers}
              data={{
                0: [
                  "06/02/2024",
                  "Charles",
                  "grade a",
                  "quantity",
                  "unit price",
                  "Update",
                ],
              }}
              isLoading={isLoading}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stockout;
