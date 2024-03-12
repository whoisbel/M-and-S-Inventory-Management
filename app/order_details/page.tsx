"use client";
import { CustomTable, DownloadButton } from "@/components";
import { OrderDetail, StatusEnum } from "@prisma/client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UpdateModal } from "@/components";
import { swalCustomClass } from "@/utils/swalConfig";

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
          <label>Sort by:</label>
          <select name="sort-select" id="">
            <option value="select sort">Select Sort</option>
            <option value="quantity-ascending">Quantity-Ascending</option>
            <option value="quantity-descending">Quantity-Descending</option>
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
        <DownloadButton
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
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
