"use client";
import { CustomTable } from "@/components";
import { useEffect, useState } from "react";
import {
  customTableDataType,
  customTableProps,
  inventoryDataType,
} from "@/types";
import { Area, Grade } from "@prisma/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPortal } from "react-dom";
const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<inventoryDataType[]>([]);
  const [tableData, setTableData] = useState<customTableDataType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [swalShown, setSwalShown] = useState(false);
  const [filter, setFilter] = useState({
    dateFilter: "",
    areaFilter: "",
    gradeFilter: "",
  });
  const [area, setArea] = useState<Area[]>([]);
  const [grade, setGrade] = useState<Grade[]>([]);
  const [dates, setDates] = useState<{ harvestDate: string }[]>([]);
  //get data from api
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/inventory/inventory");
      const { data, area, date, grade } = await response.json();
      setInventoryData(data);
      setIsLoading(false);
      setArea(area);
      setGrade(grade);
      setDates(date);
      console.log(date);
    };
    fetchData();
  }, []);

  //trigger after inventory data is set
  useEffect(() => {
    setTableData(getDefaultData());
    console.log(tableData);
  }, [inventoryData]);
  useEffect(() => {
    filterTable();
  }, [filter]);
  const headers = [
    "Harvest Date",
    "Area",
    "Grade",
    "Quantity",
    "Washed",
    "Actions",
  ];
  const data = {
    0: ["06/02/2024", "Charles", "grade a", "quantity", "unit price", "Update"],
  };

  //turn json data to table json
  function getDefaultData() {
    const defaultTableData: customTableDataType = {};

    inventoryData.map((data) => {
      defaultTableData[data.id] = [
        String(data.harvestDate),
        data.areaName,
        data.gradeName,
        String(data.quantity),
        data.isWashed ? "True" : "False",
        "update delete",
      ];
    });
    return defaultTableData;
  }

  const filterTable = () => {
    const defaultTableData = getDefaultData();

    let newTableData = Object.keys(defaultTableData).filter((data) => {
      if (filter.areaFilter == "") {
        return true;
      } else {
        return defaultTableData[Number(data)][1] == filter.areaFilter;
      }
    });
    newTableData = newTableData.filter((data) => {
      if (filter.gradeFilter == "") {
        return true;
      } else {
        return defaultTableData[Number(data)][2] == filter.gradeFilter;
      }
    });
    newTableData = newTableData.filter((data) => {
      if (filter.dateFilter == "") {
        return true;
      } else {
        return defaultTableData[Number(data)][0] == filter.dateFilter;
      }
    });

    const filteredData: typeof defaultTableData = {};
    newTableData.map((key) => {
      filteredData[Number(key)] = defaultTableData[Number(key)];
    });
    setTableData(filteredData);
  };

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
    console.log(swal.getHtmlContainer());
  };
  return (
    <div className="h-full w-full bg-white text-black">
      {swalShown && createPortal(<InventoryModal />, swal.getHtmlContainer()!)}
      <div className="bg-accent-gray py-2  px-3 flex gap-2">
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
              setFilter({ ...filter, dateFilter: e.target.value });
            }}
          >
            <option value="">Date</option>

            {dates.map((date, ind) => (
              <option key={ind} value={date.harvestDate}>
                {date.harvestDate}
              </option>
            ))}
          </select>
          <select
            className="w min-w-[150px]"
            defaultValue=""
            onChange={(e) => {
              setFilter({ ...filter, gradeFilter: e.target.value });
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
              setFilter({ ...filter, areaFilter: e.target.value });
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
      </div>
      <div className="flex flex-col p-3 bg-white">
        <CustomTable
          headers={headers}
          data={tableData}
          isLoading={isLoading}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Inventory;

const InventoryModal = () => {
  return (
    <div className="flex bg-accent-gray min-w-[900px] min-h-[400px] flex-col text-black rounded">
      <div className=" bg-add-minus flex items-center p-3">
        <b>Inventory</b>
      </div>
      <div className="flex">
        <label>Date:</label>
        <input type="text" name="date" />
        <label>Area</label>
        <input type="text" name="area" />
        <label>quantity</label>
      </div>
    </div>
  );
};
