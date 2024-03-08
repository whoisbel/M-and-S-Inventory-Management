"use client";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import {
  categoryFormData,
  customTableDataType,
  customTableProps,
  inventoryDataType,
} from "@/types";
import {
  CustomTable,
  DownloadButton,
  StockOutModal,
  AddNewButton,
} from "@/components";
import { Grade, Stockout } from "@prisma/client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import * as XLSX from "xlsx";
import { use } from "chai";
const StockoutPage = () => {
  const [createStockOutModalShown, setCreateStockOutModalShown] =
    useState(false);
  const [stockout, setStockout] = useState<Stockout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [grade, setGrade] = useState<Grade[]>([]);
  const [tableData, setTableData] = useState<customTableDataType>({});
  const [selectedUpdateData, setSelectedUpdateData] = useState<string[]>([]);
  const headers = ["Stockout Date", "Grade", "Quantity", "Type"];
  const [sort, setSort] = useState("");
  const swal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/inventory/stockout");
      const { stockout, grade } = await res.json();
      console.log(stockout);
      setStockout(stockout);
      setGrade(grade);
    };
    fetchData();
  }, []);

  function handleUpdate(index: number) {
    swal.fire({
      didOpen: () => setCreateStockOutModalShown(true),
      didClose: () => setCreateStockOutModalShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
    setSelectedUpdateData(tableData[index]);
    console.log(swal.getHtmlContainer());
  }

  function handleCreateStockOut() {
    swal.fire({
      didOpen: () => setCreateStockOutModalShown(true),
      didClose: () => setCreateStockOutModalShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
  }
  function getDefaultTableData() {
    const data: customTableDataType = {};
    stockout.map((stock) => {
      data[stock.id] = [
        new Date(stock.dateOut).toLocaleDateString(),
        stock.stock.grade.description,
        stock.quantity.toString(),
        stock.stockoutType,
      ];
    });
    return data;
  }
  useEffect(() => {
    setTableData(getDefaultTableData());
    console.log({ tableData });
    setIsLoading(false);
  }, [stockout]);

  useEffect(() => {
    setTableData((prev) => {
      const sortedData = sortData(prev);
      console.log(sortedData); // Add this line
      return sortedData;
    });
  }, [sort]);
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
    //sort dating according to the option selected in my select sort below
    const sortedKeys = Object.keys(data).sort((a, b) => {
      if (sort == "date ascending") {
        return (
          new Date(data[Number(a)][0]).getTime() -
          new Date(data[Number(b)][0]).getTime()
        );
      } else if (sort == "date descending") {
        return (
          new Date(data[Number(b)][0]).getTime() -
          new Date(data[Number(a)][0]).getTime()
        );
      } else if (sort == "grade ascending") {
        return data[Number(a)][1].localeCompare(data[Number(b)][2]);
      } else if (sort == "grade descending") {
        return data[Number(b)][1].localeCompare(data[Number(a)][2]);
      } else if (sort == "quantity ascending") {
        const quantityA = Number(data[Number(a)][3]);
        const quantityB = Number(data[Number(b)][3]);
        if (isNaN(quantityA) || isNaN(quantityB)) {
          return 0;
        }
        return quantityA - quantityB;
      } else if (sort == "quantity descending") {
        const quantityA = Number(data[Number(a)][2]);
        const quantityB = Number(data[Number(b)][2]);
        if (isNaN(quantityA) || isNaN(quantityB)) {
          return 0;
        }
        return quantityB - quantityA;
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
          {createStockOutModalShown &&
            createPortal(
              <StockOutModal
                swal={swal}
                setModalOpen={setCreateStockOutModalShown}
                grade={grade}
              />,
              swal.getHtmlContainer()!
            )}
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
                <option value="date ascending">Date Ascending</option>
                <option value="date descending">Date Descending</option>
                <option value="grade ascending">Grade Ascending</option>
                <option value="grade descending">Grade Descending</option>
                <option value="quantity ascending">Quantity Ascending</option>
                <option value="quantity descending">Quantity Descending</option>
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
            </div>
          </div>
          <div className="w-full flex justify-end p-4 self-end">
            <div className="py-5">
              <AddNewButton
                onClick={() => {
                  handleCreateStockOut();
                }}
              />
            </div>
            <DownloadButton onClick={downloadTableAsExcel} />
          </div>
          <div className="overflow-auto mx-5 max-h-[calc(100vh-220px)]">
            <CustomTable
              headers={headers}
              data={tableData}
              isLoading={isLoading}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockoutPage;
