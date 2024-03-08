"use client";
import { CustomTable } from "@/components";
import { OrderDetail } from "@prisma/client";
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/order_details");
      if (response.ok) {
        const { data } = await response.json();

        setOrderDetails(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const tableData = makeTableData(orderDetails);
    setTableData(tableData);
  }, [orderDetails]);
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
        orderDate,
        orderDetail.order.customer.firstName,
        orderDetail.stock.grade.description,
        orderDetail.orderQuantity,
        orderDetail.stock.grade.price,
        orderDetail.stock.grade.price * orderDetail.orderQuantity,
        orderDetail.status,
        loadingSchedule,
        `update`,
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
          <select className="w min-w-[150px]">
            <option value="Date" disabled>
              Date
            </option>
          </select>

          <select className="w min-w-[150px]">
            <option value="Status" disabled>
              Status
            </option>
          </select>
        </div>
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
