"use client";
import Swal from "sweetalert2";
import { inventoryDataType } from "@/types";
import { useState, useEffect } from "react";
import { BiX, BiError } from "react-icons/bi";
const StockoutModal = ({
  swal,
  inventory,
  inventoryId,
  setSwalShown,
}: {
  swal: typeof Swal;
  inventory: string[];
  inventoryId: number;
  setSwalShown: (val: boolean) => void;
}) => {
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const [isError, setIsError] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(0);
  const [inputDate, setInputDate] = useState("");
  const startingQuantity = +inventory[3]; //quantity is in the 3rd index of the inventory array (see inventory page)

  useEffect(() => {
    setRemainingQuantity(startingQuantity - inputQuantity);
    console.log(inputQuantity);
    if (startingQuantity - inputQuantity < 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [inputQuantity]);

  const handleSubmit = async () => {
    if (remainingQuantity < 0) {
      setIsError(true);
      return;
    }
    if (inputQuantity === 0 || inputDate === "") {
      return;
    }
    const response = await fetch("/api/inventory/stockout", {
      method: "POST",
      body: JSON.stringify({
        inventoryId: inventoryId,
        quantity: inputQuantity,
        date: inputDate,
      }),
    });
    if (response.ok) {
      swal
        .fire({
          title: "Success",
          icon: "success",
          text: "Stockout Recorded",
        })
        .then(() => {
          setSwalShown(false);
        });
    }
  };
  return (
    <div className="w-[500px] h-[500px] flex flex-col items-center">
      <div className="bg-accent-gray text-black flex w-full justify-between items-center px-2 h-[50px]">
        <p className="text-[20px]">Create Stockout</p>

        <BiX
          className="text-[40px] hover:text-[42px] ease-in-out cursor-pointer transition-all duration-300"
          onClick={() => {
            swal.close();
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 justify-between text-start px-10 py-5">
        <label>Date: </label>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="border-2 border-add-minus"
        />
        <label>Quantity:</label>
        <input
          type="number"
          className="border-2 border-add-minus"
          value={inputQuantity != 0 ? inputQuantity : ""}
          onChange={(e) => {
            setInputQuantity(+e.target.value < 0 ? 0 : +e.target.value);
          }}
        />
        <label>Remaining Stocks:</label>
        <p className={remainingQuantity < 0 ? "text-red-500" : ""}>
          {remainingQuantity}{" "}
        </p>
      </div>
      {isError && (
        <p className="text-red-500 flex items-center px-3 mt-auto text-center mx-auto">
          <BiError className="text-[30px] mr-3" />
          Remaining stocks is lower than the quantity
        </p>
      )}
      <button
        className="bg-primary-color text-white  px-10 py-2 rounded-full hover:scale-105 ease-in-out duration-300 mt-auto mb-10"
        onClick={() => {
          handleSubmit();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default StockoutModal;
