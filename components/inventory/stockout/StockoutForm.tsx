"use client";
import { useState, useEffect } from "react";
import { Stockout } from "@prisma/client";
import { Grade, Stock } from "@prisma/client";
import { FaMinus } from "react-icons/fa";

const StockoutForm = ({
  stockoutData,
  index,
  handleDelete,
  handleUpdate,

  grade,
}: {
  grade: Grade[];
  stockoutData: {
    stockout: Stockout;
    error: { quantity: boolean; stock: boolean; grade: boolean };
  };
  index: number;
  handleUpdate: (index: number, stockout: Stockout) => void;
  handleDelete: (index: number) => void;
}) => {
  const [stock, setStock] = useState<Stock>();
  const { stockout, error } = stockoutData;
  useEffect(() => {
    async function fetchStock() {
      if (stockout.gradeId == 0) {
        handleUpdate(index, {
          stockout: stockout,
          error: { ...error, stock: false, grade: true },
        });
        return;
      }
      const res = await fetch(
        `/api/inventory/stockout/${stockout.gradeId}/${stockout.washed}`
      );
      const data = await res.json();
      console.log("Hello");
      setStock(data);
      if (data) {
        handleUpdate(index, {
          stockout: stockout,
          error: { ...error, stock: false, grade: false },
        });
      } else {
        handleUpdate(index, {
          stockout: stockout,
          error: { ...error, stock: true, grade: false },
        });
      }
    }
    fetchStock();
  }, [stockout.gradeId, stockout.washed]);

  useEffect(() => {
    //This useEffect is used to check if quantity is lesser or greater than stock quantity
    if (stockout.quantity > stock?.quantityOnHand) {
      handleUpdate(index, {
        stockout: stockout,
        error: { ...error, quantity: true },
      });
    } else {
      handleUpdate(index, {
        stockout: stockout,
        error: { ...error, quantity: false },
      });
    }
  }, [stockout.quantity]);

  return (
    <div
      className={`bg-accent-gray shadow w-full min-h-[54px] flex gap-5 p-2  border-[1px] rounded-lg overflow-auto items-center ${
        error.quantity || error.stock
          ? "border-red-600 border-2 bg-red-500"
          : "border-add-minus"
      }`}
    >
      <label>Grade:</label>

      <select
        name=""
        id=""
        className="border-2 border-add-minus text-black"
        value={stockout.gradeId}
        onChange={(e) => {
          handleUpdate(index, {
            stockout: { ...stockout, gradeId: +e.target.value },
            error: error,
          });
        }}
        aria-placeholder="Select Grade"
      >
        <option value={0} disabled>
          Choose Grade
        </option>
        {grade.map((grade) => {
          if (grade.description.toLowerCase() != "ungraded") {
            return (
              <option key={grade.id} value={grade.id}>
                {grade.description}
              </option>
            );
          }
        })}
      </select>
      <label>Washed:</label>
      <input
        type="checkbox"
        name="washed"
        className="h-[20px] py-3 px-1 border-2 border-add-minus"
        value={stockout.washed}
        onChange={(e) => {
          handleUpdate(index, {
            stockout: { ...stockout, washed: e.target.checked },
            error: error,
          });
        }}
      />
      <label>Quantity:</label>
      <input
        type="number"
        name="quantity"
        className="h-[20px] py-3 px-1 border-2 border-add-minus w-[100px]"
        value={stockout.quantity == 0 ? "" : stockout.quantity}
        onChange={(e) => {
          handleUpdate(index, {
            stockout: { ...stockout, quantity: +e.target.value },
            error: error,
          });
        }}
      />
      <label htmlFor="">Stock Qty:</label>
      <p>{stock ? stock.quantityOnHand : 0}</p>
      <button
        className="ml-auto h-full text-[30px]"
        onClick={() => {
          handleDelete(index);
        }}
      >
        <FaMinus className="fill-add-minus " />
      </button>
    </div>
  );
};

export default StockoutForm;
