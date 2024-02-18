"use client";
import Swal from "sweetalert2";
import { Grade, Stock } from "@prisma/client";
import { BiX, BiError } from "react-icons/bi";
import { useState, useEffect } from "react";
import { swalCustomClass } from "@/utils/swalConfig";
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
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [washed, setWashed] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(0);
  const [remainingQuantity, setRemainingQuantity] = useState(0); //The remaining stock after substacted by the input quantity
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchRemainingStock = async () => {
      if (selectedGrade == 0) {
        setRemainingStock(undefined);
      }
      const res = await fetch(
        `/api/inventory/stockout/${selectedGrade}/${washed}`
      );
      const remainingStock = await res.json();
      setRemainingStock(remainingStock);
    };
    fetchRemainingStock();
  }, [selectedGrade, washed]);

  useEffect(() => {
    setRemainingQuantity(
      ((remainingStock && remainingStock.quantityOnHand) || 0) - inputQuantity
    );
  }, [inputQuantity, remainingStock]);

  function handleSubmit() {
    if (remainingQuantity < 0) {
      setIsError(true);
      return;
    }

    fetch("/api/inventory/stockout/disposed", {
      method: "POST",
      body: JSON.stringify({
        gradeId: selectedGrade,
        isWashed: washed,
        quantity: inputQuantity,
      }),
    }).then((res) => {
      if (res.status === 200) {
        swal
          .fire({
            title: "Stockout Recorded",
            icon: "success",
            customClass: swalCustomClass,
          })
          .then(() => {
            setModalOpen(false);
            swal.close();
          });
      }
    });
  }
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
        <input type="date" className="border-2 border-add-minus" />

        <label>Grade:</label>
        <select
          className="border-2 border-add-minus"
          onChange={(e) => setSelectedGrade(+e.target.value)}
        >
          <option value={0}>Grade</option>
          {grade.map((g, ind) => (
            <option key={ind} value={g.id}>
              {g.description}
            </option>
          ))}
        </select>
        <label>Washed</label>
        <input type="checkbox" onChange={(e) => setWashed((prev) => !prev)} />
        <label>Quantity:</label>
        <input
          type="number"
          className="border-2 bg-add-minux"
          onChange={(e) => setInputQuantity(+e.target.value)}
        />
        <label>Remaining Stocks:</label>
        <input
          type="text"
          value={remainingQuantity}
          className={remainingQuantity < 0 ? "text-red-500" : ""}
          readOnly
        />
      </div>
      {isError && (
        <p className="text-red-500 flex items-center px-3 mt-auto text-center mx-auto">
          <BiError className="text-[30px] mr-3" />
          Remaining stocks is lower than the quantity
        </p>
      )}
      <button
        className="bg-primary-color text-white  px-10 py-2 rounded-full hover:scale-105 ease-in-out duration-300 mt-auto mb-10"
        onClick={() => handleSubmit()}
      >
        Save
      </button>
    </div>
  );
};

export default StockOutModal;
