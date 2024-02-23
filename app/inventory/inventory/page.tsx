"use client";
"use client";
import { useEffect, useState } from "react";
import { SortModal, StockoutModal, InventoryUpdateForm } from "@/components";
import { CustomTable } from "@/components";
import { Area, Grade } from "@prisma/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPortal } from "react-dom";
import { customTableDataType, inventoryDataType } from "@/types";
import { BiSearch } from "react-icons/bi";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<inventoryDataType[]>([]);
  const [tableData, setTableData] = useState<customTableDataType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [ungradedAlertShown, setUngradedAlertShown] = useState(false);
  const [gradedAlertShown, setGradedAlertShown] = useState(false);
  const [stockoutAlertShown, setStockoutAlertShown] = useState(false);
  const [selectedUpdateData, setSelectedUpdateData] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState({
    dateFilter: "",
    areaFilter: "",
    gradeFilter: "",
  });
  const [area, setArea] = useState<Area[]>([]);
  const [grade, setGrade] = useState<Grade[]>([]);
  const [dates, setDates] = useState<{ harvestDate: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/inventory/inventory");
      const { data, area, date, grade } = await response.json();
      setInventoryData(data);
      setIsLoading(false);
      setArea(area);
      setGrade(grade);
      setDates(date);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTableData(getDefaultData());
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

  function getDefaultData() {
    return inventoryData.reduce((acc, data) => {
      acc[data.id] = [
        String(data.harvestDate),
        data.areaName,
        data.gradeName,
        String(data.quantity),
        data.isWashed ? "True" : "False",
        `update delete ${data.gradeName == "Ungraded" ? "stockout" : ""}`,
      ];
      return acc;
    }, {} as customTableDataType);
  }

  function filterTable() {
    const defaultTableData = getDefaultData();
    const newTableData = Object.keys(defaultTableData).filter((key) => {
      return (
        (filter.areaFilter === "" ||
          defaultTableData[Number(key)][1] === filter.areaFilter) &&
        (filter.gradeFilter === "" ||
          defaultTableData[Number(key)][2] === filter.gradeFilter) &&
        (filter.dateFilter === "" ||
          defaultTableData[Number(key)][0] === filter.dateFilter)
      );
    });

    const filteredData = newTableData.reduce((acc, key) => {
      acc[Number(key)] = defaultTableData[Number(key)];
      return acc;
    }, {} as customTableDataType);

    setTableData(filteredData);
  }

  const swal = withReactContent(Swal);

  function ungradedUpdate(index: number) {
    swal.fire({
      didOpen: () => setUngradedAlertShown(true),
      didClose: () => setUngradedAlertShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
  }

  function gradedUpdate(index: number) {
    swal.fire({
      didOpen: () => setGradedAlertShown(true),
      didClose: () => setGradedAlertShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded-lg !p-0",
        htmlContainer: "!m-0 !rounded-lg p-0",
      },
    });
  }

  function handleUpdate(index: number) {
    setSelectedIndex(index);
    if (tableData[index][2] == "Ungraded") {
      ungradedUpdate(index);
    } else {
      gradedUpdate(index);
    }
  }

  function handleDelete(inventoryId: number) {
    const swal = withReactContent(Swal);
    swal
      .fire({
        title: "Are you sure you want to delete?",
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        customClass: {
          confirmButton: "!bg-red-500",
        },
      })
      .then((response) => {
        if (response.isConfirmed) {
          fetch("/api/inventory/inventory", {
            method: "DELETE",
            body: JSON.stringify({ inventoryId: inventoryId }),
          }).then(() => {
            location.reload();
          });
        }
      });
  }

  function handleStockout(index: number) {
    console.log(index);
    setSelectedIndex(index);
    swal.fire({
      didOpen: () => setStockoutAlertShown(true),
      didClose: () => setStockoutAlertShown(false),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded-lg !p-0",
        htmlContainer: "!m-0 !rounded-lg p-0",
      },
    });
  }
  return (
    <div className="h-full w-full bg-white text-black">
      {ungradedAlertShown &&
        createPortal(
          <SortModal
            inventoryData={tableData[selectedIndex]}
            swal={swal}
            setSwalShown={setUngradedAlertShown}
            grade={grade}
            inventoryId={selectedIndex}
          />,
          swal.getHtmlContainer()!
        )}
      {gradedAlertShown &&
        createPortal(
          <InventoryUpdateForm
            inventoryData={tableData[selectedIndex]}
            inventoryId={selectedIndex}
            swal={swal}
            setSwalShown={setGradedAlertShown}
          />,
          swal.getHtmlContainer()!
        )}
      {stockoutAlertShown &&
        createPortal(
          <StockoutModal
            swal={swal}
            inventory={tableData[selectedIndex]}
            inventoryId={selectedIndex}
            setSwalShown={setStockoutAlertShown}
          />,
          swal.getHtmlContainer()!
        )}
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
              setFilter({
                ...filter,
                gradeFilter: e.target.value,
              });
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
              setFilter({
                ...filter,
                areaFilter: e.target.value,
              });
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
            placeholder="Search"
            className="rounded-lg placeholder:pl-2"
          />
          <BiSearch className="-ml-[1.25em] text-primary-color" />
        </div>
      </div>

      <div className="flex flex-col p-3 bg-white">
        <CustomTable
          headers={headers}
          data={tableData}
          isLoading={isLoading}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleStockout={handleStockout}
        />
      </div>
    </div>
  );
};

export default Inventory;
