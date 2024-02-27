"use client";
import Swal from "sweetalert2";
import { Grade, Stock, Stockout } from "@prisma/client";
import { BiX, BiError } from "react-icons/bi";
import { useState, useEffect } from "react";
import { swalCustomClass } from "@/utils/swalConfig";
import { CgAdd } from "react-icons/cg";
import { StockoutForm } from "@/components";

const StockOutModal = ({
  swal,
  setModalOpen,
  grade,
}: {
  swal: typeof Swal;
  setModalOpen: (value: boolean) => void;
  grade: Grade[];
}) => {
  const [remainingStock, setRemainingStock] = useState<Stock>();
  const [stockoutData, setStockoutData] = useState<
    {
      stockout: Stockout;
      error: {
        quantity: boolean;
        stock: boolean;
        grade: boolean;
        [key: string]: boolean;
      };
    }[]
  >([]);

  const [isError, setIsError] = useState({
    quantity: false,
    stock: false,
    grade: false,
  });

  function addStockout() {
    const newStockout: Stockout = {
      gradeId: 0,
      quantity: 0,
      washed: false,
    };
    const newError = { quantity: false, stock: false, grade: true };
    const newData = { stockout: newStockout, error: newError };
    setStockoutData([...stockoutData, newData]);
  }
  function removeStockout(index: number) {
    const newStockoutData = [...stockoutData];
    newStockoutData.splice(index, 1);
    setStockoutData(newStockoutData);
  }
  const handleUpdate = (index: number, data: (typeof stockoutData)[0]) => {
    console.log(data);
    const newStockoutData = [...stockoutData];
    newStockoutData[index] = data;
    setStockoutData(newStockoutData);
  };

  function getError() {
    let newError: {
      quantity: boolean;
      stock: boolean;
      grade: boolean;
      [key: string]: boolean;
    } = { quantity: false, stock: false, grade: false };
    stockoutData.forEach((data) => {
      const { error } = data;
      Object.keys(error).map((key) => {
        console.log(newError);
        if (error[key]) {
          newError[key] = error[key];
        }
      });
    });
    console.log({ newError });
    setIsError(newError);
  }

  async function handleSubmit() {
    getError();
    if (isError.grade || isError.quantity || isError.stock) {
      return;
    }
    const stockouts = stockoutData.map((data) => data.stockout);
    const response = await fetch("/api/inventory/stockout", {
      method: "POST",
      body: JSON.stringify(stockouts),
    }).then((res) => {
      if (res.ok) {
        swal.fire({
          title: "Stockout added",
          icon: "success",
          customClass: swalCustomClass,
        });
        setModalOpen(false);
        location.reload();
      } else {
        swal.fire({
          title: "Error",
          icon: "error",
          customClass: swalCustomClass,
        });
      }
    });
  }
  return (
    <div className="flex bg-white min-w-[900px] min-h-[400px] flex-col text-black rounded">
      <div className=" bg-accent-gray flex items-center p-3">
        <b>Stockout</b>
      </div>
      <div className="px-3 flex flex-col gap-3">
        <div className="flex gap-3 items-center  py-1 text-[20px]">
          <label>Date:</label>
          <input
            type="date"
            name=""
            className="h-[20px] py-3 px-1 border-2 border-add-minus"
            defaultValue={new Date().toISOString().split("T")[0]}
          />

          <button
            className="px-3 py-2 shadow-neutral-600 border-add-minus shadow button hover:bg-neutral-500 bg-accent-gray border-[1px] rounded flex ml-auto"
            onClick={() => {
              addStockout();
            }}
          >
            Add New
            <CgAdd />
          </button>
        </div>

        <div className="py-2 h-[500px] overflow-y-auto flex  flex-col gap-3">
          {stockoutData.map((data, index) => {
            return (
              <StockoutForm
                grade={grade} // TODO: Check if this is the correct type,
                key={index}
                stockoutData={data}
                index={index}
                handleDelete={removeStockout}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </div>
        <div className="">
          {isError.grade && (
            <p className="flex justify-center items-center text-red-500">
              <BiError className=" h-[20px] w-[20px] mr-4" /> Please choose
              grade or remove the form without grade.
            </p>
          )}
          {isError.quantity && (
            <p className="flex justify-center items-center text-red-500">
              <BiError className=" h-[20px] w-[20px] mr-4" /> Stockout quantity
              is greater than the stock quantity.
            </p>
          )}
          {isError.stock && (
            <p className="flex justify-center items-center text-red-500">
              <BiError className=" h-[20px] w-[20px] mr-4" /> Stock doesn't
              exist.
            </p>
          )}
        </div>
        <div className="py-4 flex gap-3 justify-center">
          <button
            className="bg-red-500 text-white float-right min-w-[100px] rounded-full px-4 py-2"
            onClick={() => {
              swal.close();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary-color text-white float-right min-w-[100px] rounded-full px-4 py-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockOutModal;
