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
  const [sort, setSort] = useState("");
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

  useEffect(() => {
    setTableData((prev) => {
      return sortData(prev);
    });
  }, [sort]);
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
  const sortData = (data: {
    [key: number]: string[];
  }): { [key: number]: string[] } => {
    const sortedKeys = Object.keys(data).sort((a, b) => {
      if (sort == "grade ascending") {
        return data[Number(a)][0].localeCompare(data[Number(b)][0]);
      } else if (sort == "grade descending") {
        return data[Number(b)][0].localeCompare(data[Number(a)][0]);
      } else if (sort == "quantity descending") {
        const quantityA = Number(data[Number(a)][1]);
        const quantityB = Number(data[Number(b)][1]);
        if (isNaN(quantityA) || isNaN(quantityB)) {
          return 0;
        }
        return quantityA - quantityB;
      } else if (sort == "quantity ascending") {
        const quantityA = Number(data[Number(a)][1]);
        const quantityB = Number(data[Number(b)][1]);
        if (isNaN(quantityA) || isNaN(quantityB)) {
          return 0;
        }
        return quantityB - quantityA;
      } else if (sort == "price descending") {
        const priceA = Number(data[Number(a)][3].replace(/[^0-9.-]+/g, ""));
        const priceB = Number(data[Number(b)][3].replace(/[^0-9.-]+/g, ""));
        if (isNaN(priceA) || isNaN(priceB)) {
          return 0;
        }
        return priceA - priceB;
      } else if (sort == "price ascending") {
        const priceA = Number(data[Number(a)][3].replace(/[^0-9.-]+/g, ""));
        const priceB = Number(data[Number(b)][3].replace(/[^0-9.-]+/g, ""));
        if (isNaN(priceA) || isNaN(priceB)) {
          return 0;
        }
        return priceB - priceA;
      } else {
        return 0;
      }
    });

    const sortedData: { [key: number]: string[] } = {};
    sortedKeys.forEach((key, index) => {
      sortedData[index] = data[Number(key)];
    });

    return sortedData;
  };
  return (
    <div className="h-full w-full bg-custom-white">
      <div className="bg-accent-gray w-full gap-2 flex items-center text-letters-color">
        <div className="h-full w-full bg-white text-black">
          <div className="bg-accent-gray py-2  px-3 flex gap-2 w-full h-max">
            <div className="flex gap-3">
              <label>Sort by:</label>
              <select
                name="sort-select"
                id=""
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="select sort" disabled>
                  Select Sort
                </option>
                <option value="grade ascending">Grade Ascending</option>
                <option value="grade descending">Grade Descending</option>
                <option value="quantity ascending">Quantity Ascending</option>
                <option value="quantity descending">Quantity Descending</option>
                <option value="price ascending">Price Ascending</option>
                <option value="price descending">Price Descending</option>
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
          <div className="overflow-auto mx-5 max-h-[calc(100vh-220px)]">
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
