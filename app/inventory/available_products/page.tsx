"use client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  categoryFormData,
  customTableDataType,
  customTableProps,
  inventoryDataType,
} from "@/types";
import { CustomTable, DownloadButton } from "@/components";
import { Area, Grade } from "@prisma/client";

import { Stock } from "@prisma/client";

import Swal from "sweetalert2";
import * as XLSX from "xlsx";
const AvailableProducts = () => {
  const [availableProducts, setAvailableProducts] = useState<Stock[]>([]);
  const [filter, setFilter] = useState({
    gradeFilter: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [grade, setGrade] = useState<Grade[]>([]);
  const [tableData, setTableData] = useState<customTableDataType>({});
  const [selectedUpdateData, setSelectedUpdateData] = useState<string[]>([]);
  const headers = ["Grade", "Quantity", "Washed", "Price"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/inventory/available_products");
      const { availableProducts, area, grade } = await response.json();
      setAvailableProducts(availableProducts);

      setGrade(grade);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTableData(getDefaultTableData());
    setIsLoading(false);
  }, [availableProducts]);

  useEffect(() => {
    filterTable();
  }, [filter]);
  function getDefaultTableData() {
    const data: customTableDataType = {};
    availableProducts.forEach((product) => {
      data[product.id] = [
        product.grade.description,
        product.quantityOnHand.toString(),
        product.isWashed.toString(),
        `${product.grade.price.toString()}.00 Php`,
      ];
    });
    return data;
  }
  const filterTable = () => {
    const defaultTableData = getDefaultTableData();
    const newTableData = Object.keys(defaultTableData).filter((key) => {
      return (
        filter.gradeFilter === "" ||
        defaultTableData[Number(key)][0] === filter.gradeFilter
      );
    });

    const filteredData = newTableData.reduce((acc, key) => {
      acc[Number(key)] = defaultTableData[Number(key)];
      return acc;
    }, {} as customTableDataType);

    setTableData(filteredData);
  };
  function downloadTableAsExcel() {
    // Convert the table data to an array of arrays
    const tableDataArray = Object.values(tableData);

    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...tableDataArray]);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook and download it as an Excel file
    XLSX.writeFile(wb, "table_data.xlsx");
  }
  return (
    <div className="h-full w-full bg-custom-white">
      <div className="bg-accent-gray w-full gap-2 flex items-center text-letters-color">
        <div className="h-full w-full bg-white text-black">
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
                    setFilter({ gradeFilter: e.target.value });
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
            </div>
          </div>
          <div className=" flex justify-end">
            <DownloadButton onClick={downloadTableAsExcel} />
          </div>
          <div className=" mx-5 max-h-[550px] overflow-auto border border-add-minus">
            <CustomTable
              headers={headers}
              data={tableData}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableProducts;
