"use client";
import { CustomTable, DownloadButton, SearchBar } from "@/components";
import { OrderDetail, StatusEnum } from "@prisma/client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UpdateModal } from "@/components";
import { swalCustomClass } from "@/utils/swalConfig";
import { utils, writeFile } from "xlsx";
interface TableDataRow {
  id: string;
  date: Date;
  name: string;
  grade: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  loading_schedule: Date;
}
const OrderDetails = () => {
  const [filters, setFilters] = useState({
    date: "",
    grade: "",
    status: "",
  });
  const swal = withReactContent(Swal);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [tableData, setTableData] = useState({}); // This is the data that will be passed to the CustomTable component
  const [updateModalShown, setUpdateModalShown] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
  const [dateFilters, setDateFilters] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    dateFilter: "",
    status: "",
  });
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/order_details");
      if (response.ok) {
        const { data } = await response.json();

        setOrderDetails(data);
        const dateFilters: string[] = [];
        data.forEach((orderDetail: OrderDetail) => {
          const date = new Date(
            orderDetail.order.orderDate
          ).toLocaleDateString();
          if (!dateFilters.includes(date)) {
            dateFilters.push(date);
          }
        });
        setDateFilters(dateFilters);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const tableData = makeTableData(orderDetails);
    setTableData(tableData);
  }, [orderDetails]);

  useEffect(() => {
    filterData();
  }, [filterOptions]);
  useEffect(() => {
    setTableData((prev) => {
      const sortedData = sortData(prev);
      console.log(sortedData); // Add this line
      return sortedData;
    });
  }, [sort]);
  useEffect(() => {
    if (searchTerm === "") {
      setTableData(makeTableData(orderDetails));
    } else {
      const filteredData = Object.values(
        tableData as { [key: string]: string[] }
      ).filter((row: string[]) => {
        return (
          row[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
          row[2].toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setTableData(filteredData);
    }
  }, [searchTerm]);
  const headers = [
    "Order Id",
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
  function makeTableData(data: OrderDetail[]) {
    const tableData: { [key: string]: any[] } = {};
    data.forEach((orderDetail) => {
      console.log(orderDetail.order.id);
      const orderDate = new Date(
        orderDetail.order.orderDate
      ).toLocaleDateString();
      const loadingSchedule = new Date(
        orderDetail.loadingSchedule
      ).toLocaleDateString();
      tableData[orderDetail.id] = [
        `${orderDetail.order.id}`,
        `${orderDate}`,
        `${orderDetail.order.customer.firstName}`,
        `${orderDetail.stock.grade.description}`,
        `${orderDetail.orderQuantity}`,
        `${orderDetail.stock.grade.price}`,
        `${orderDetail.unitPrice * orderDetail.orderQuantity}`,
        `${orderDetail.status}`,
        `${loadingSchedule}`,
        orderDetail.status != StatusEnum.fulfilled ? "update" : "",
      ];
    });
    return tableData;
  }

  function handleUpdateButtonClick(id: number) {
    let selectedOrderDetail;
    orderDetails.forEach((orderDetail) => {
      if (orderDetail.id === id) {
        selectedOrderDetail = orderDetail;
      }
    });
    swal.fire({
      didClose: () => {
        setUpdateModalShown(false);
      },
      didOpen: () => {
        setUpdateModalShown(true);
      },
      showConfirmButton: false,
      customClass: swalCustomClass,
    });
    setUpdateModalShown(true);
    console.log(selectedOrderDetail);
    setSelectedOrderDetail(selectedOrderDetail!);
  }

  const filterData = () => {
    const defaultTableData = makeTableData(orderDetails);
    let newTableData = Object.keys(defaultTableData).filter((data) => {
      if (filterOptions.dateFilter == "") {
        return true;
      } else {
        return defaultTableData[Number(data)][1] == filterOptions.dateFilter;
      }
    });
    newTableData = newTableData.filter((data) => {
      if (filterOptions.status == "") {
        return true;
      } else {
        return defaultTableData[Number(data)][7] == filterOptions.status;
      }
    });
    const filteredData: typeof defaultTableData = {};
    newTableData.map((key) => {
      filteredData[Number(key)] = defaultTableData[Number(key)];
    });
    setTableData(filteredData);
  };
  function processTableData(tableData: { [key: string]: string[] }) {
    const processedData = Object.values(tableData).map((row) => ({
      id: row[0],
      date: row[1],
      name: row[2],
      grade: row[3],
      quantity: row[4],
      price: row[5],
      total: row[6],
      status: row[7],
      loading_schedule: row[8],
    }));

    return processedData;
  }
  function downloadTableAsExcel() {
    const processedData = processTableData(tableData);

    // Create a new workbook
    const wb = utils.book_new();

    // Convert the processed data to a worksheet
    const ws = utils.json_to_sheet(processedData);

    // Add the worksheet to the workbook
    utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook to a file
    writeFile(wb, "tableData.xlsx");
  }
  function sortData(data: { [key: string]: string[] }): {
    [key: string]: string[];
  } {
    const sortedKeys = Object.keys(data).sort((a, b) => {
      switch (sort) {
        case "order-date ascending":
          return (
            new Date(data[Number(a)][1]).getTime() -
            new Date(data[Number(b)][1]).getTime()
          );
        case "order-date descending":
          return (
            new Date(data[Number(b)][1]).getTime() -
            new Date(data[Number(a)][1]).getTime()
          );
        case "loading-schedule ascending":
          return (
            new Date(data[Number(a)][8]).getTime() -
            new Date(data[Number(b)][8]).getTime()
          );
        case "loading-schedule descending":
          return (
            new Date(data[Number(b)][8]).getTime() -
            new Date(data[Number(a)][8]).getTime()
          );
        default:
          return 0;
      }
    });

    const sortedData: { [key: string]: string[] } = {};
    sortedKeys.forEach((key, index) => {
      sortedData[index] = data[Number(key)];
    });

    return sortedData;
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  return (
    <div className="h-full w-full bg-white text-black">
      {updateModalShown &&
        createPortal(
          <UpdateModal
            swal={swal}
            setSwalShown={setUpdateModalShown}
            selectedOrderDetail={selectedOrderDetail!}
          />,
          swal.getHtmlContainer()!
        )}
      <div className="bg-accent-gray py-2 px-3 flex gap-2">
        <div className="flex gap-3">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex gap-3">
          <label>Sort by:</label>
          <select
            name="sort-select"
            id=""
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="select sort">Select Sort</option>
            <option value="order-date ascending">Order Date Ascending</option>
            <option value="order-date descending">Order Date Descending</option>
            <option value="loading-schedule ascending">
              Loading Schedule Ascending
            </option>
            <option value="loading-schedule descending">
              Loading Schedule Descending
            </option>
          </select>
        </div>
        <div className="flex gap-3">
          <label>Filters:</label>
          <select
            className="w min-w-[150px]"
            onChange={(e) => {
              setFilterOptions({
                ...filterOptions,
                dateFilter: e.target.value,
              });
            }}
          >
            <option value="">Date</option>
            {dateFilters.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>

          <select
            className="w min-w-[150px]"
            onChange={(e) => {
              setFilterOptions({ ...filterOptions, status: e.target.value });
            }}
          >
            <option value="">Status</option>
            {Object.keys(StatusEnum).map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <DownloadButton onClick={downloadTableAsExcel} />
      </div>
      <div className="flex flex-col p-3 bg-white">
        <CustomTable
          headers={headers}
          data={tableData}
          handleUpdate={handleUpdateButtonClick}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
