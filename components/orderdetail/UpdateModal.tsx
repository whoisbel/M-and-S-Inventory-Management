"use client";
import { StatusEnum } from "@prisma/client";
import Swal from "sweetalert2";
import { OrderDetail } from "@prisma/client";
import { useState } from "react";
StatusEnum;
const UpdateModal = ({
  swal,
  setSwalShown,
  selectedOrderDetail,
}: {
  swal: typeof Swal;
  setSwalShown: (val: boolean) => void;
  selectedOrderDetail: OrderDetail;
}) => {
  const [status, setStatus] = useState(selectedOrderDetail.status);

  async function handleSubmit() {
    // Update the status
    const response = await fetch("api/order_details", {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedOrderDetail.id,
        status: status,
      }),
    });
    const { message } = await response.json();
    if (response.ok) {
      swal
        .fire({
          icon: "success",
          title: "Order status updated",
          text: message,
        })
        .then(() => {
          location.reload();
        });
      setSwalShown(false);
    } else {
      swal.fire({
        icon: "error",
        title: "An error occured",
        text: message,
      });
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor="">Status</label>
      <select
        name="status"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        className="border-2 border-add-minus outline-add-minus p-2 rounded"
      >
        {Object.keys(StatusEnum).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => {
            swal.close();
            setSwalShown(false);
          }}
          className="p-2 bg-add-minus text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="p-2 bg-primary-color text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
