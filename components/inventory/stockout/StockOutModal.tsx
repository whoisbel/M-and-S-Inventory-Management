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
  const [stockouts, setStockouts] = useState<Stock[]>([]);

  const [selectedGrade, setSelectedGrade] = useState(0);
  const [washed, setWashed] = useState(false);

  const [remainingQuantity, setRemainingQuantity] = useState(0); //The remaining stock after substacted by the input quantity
  const [isError, setIsError] = useState(false);
  const [isQuantityError, setIsQuantityError] = useState(false);

  function addStockout() {
    const stockout: Stockout = {
      gradeId: grade[0],
      quantity: 0,
      washed: false,
    };
    setStockouts([...stockouts, stockout]);
  }
  function removeStockout(index: number) {}

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

          <label>Remaining Quantity:</label>
          <p className={` ${isQuantityError && "text-red-600"}`}>0</p>
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
          {stockouts.map((stockout, index) => (
            <StockoutForm
              key={index}
              stockout={stockout}
              index={index}
              handleDelete={removeStockout}
            />
          ))}
        </div>
        {isError && (
          <p className="flex justify-center items-center text-red-500">
            <BiError className=" h-[40px] w-[40px] mr-4" /> Sorted Quantity does
            not match the ungraded quantity.
          </p>
        )}
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
            onClick={() => {}}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockOutModal;
