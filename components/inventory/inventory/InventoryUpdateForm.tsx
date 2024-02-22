"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiError, BiX } from "react-icons/bi";
import { Inventory } from "@prisma/client";

const InventoryUpdateForm = ({
  inventoryData,
  inventoryId,
  swal,
  setSwalShown,
}: {
  inventoryData: string[];
  inventoryId: number;
  swal: typeof Swal;
  setSwalShown: (val: boolean) => void;
}) => {
  const [quantity, setQuantity] = useState(inventoryData[3]);
  const [ungradedInventory, setUngradedInventory] = useState<Inventory>();
  const [remainingUngraded, setRemainingUngraded] = useState(0);
  const startingQuantity = +inventoryData[3];
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    console.log("hello");
    const remainingUngraded =
      +((ungradedInventory && ungradedInventory.quantity) || 0) +
      startingQuantity -
      +quantity;
    setRemainingUngraded(remainingUngraded);
  }, [quantity, ungradedInventory]);

  useEffect(() => {
    const getUngradedInventory = async () => {
      const response = await fetch(`/api/inventory/inventory/${inventoryId}`);
      const { ungradedInventory } = await response.json();
      console.log(ungradedInventory.quantity, "ungraded");
      setUngradedInventory(ungradedInventory);
    };
    getUngradedInventory();
  }, []);
  const onSubmit = async () => {
    if (remainingUngraded < 0) {
      setIsError(true);
      return;
    }
    const response = await fetch("/api/inventory/inventory", {
      method: "PATCH",
      body: JSON.stringify({
        inventoryId: inventoryId,
        newQuantity: quantity,
      }),
    });
    if (response.ok) {
      swal
        .fire({
          title: "Success",
          icon: "success",
          text: "Inventory Updated",
        })
        .then(() => {
          location.reload();
        });
    } else {
      swal.fire({
        title: "error",
      });
    }
    setSwalShown(false);
  };
  return (
    <div className="min-h-[450px] min-w-[400px] flex flex-col rounded-lg">
      <div className="bg-accent-gray text-black flex justify-between  h-[50px] gap-3 items-center">
        <p className="font-bold px-2">Update Inventory</p>

        <button
          onClick={() => {
            swal.close();
          }}
        >
          <BiX className="text-[40px] hover:text-[42px]  font-thin" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 justify-center py-5 px-10 ">
        <label className="text-start" htmlFor="date">
          Date
        </label>
        <input
          type="text"
          name="date"
          id="date"
          value={inventoryData[0]}
          readOnly
          className="border-2 border-add-minus"
        />
        <label className="text-start" htmlFor="area">
          Area
        </label>
        <input
          type="text"
          name="area"
          id="area"
          value={inventoryData[1]}
          readOnly
          className="border-2 border-add-minus"
        />
        <label className="text-start" htmlFor="grade">
          Grade
        </label>
        <input
          type="text"
          name="grade"
          id="grade"
          value={inventoryData[2]}
          readOnly
          className="border-2 border-add-minus"
        />
        <label htmlFor="quantity" className="text-start">
          Quantity:
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border-2 border-add-minus"
        />
        <label htmlFor="ungraded_quantity" className="text-start">
          Ungraded Remaining:
        </label>
        <input
          type="number"
          name="ungraded_quantity"
          value={remainingUngraded}
          className={remainingUngraded < 0 ? "text-red-500" : ""}
          readOnly
        />
      </div>
      {isError && (
        <p className="flex justify-center items-center text-red-500 mt-auto">
          <BiError className=" h-[40px] w-[40px] mr-4" /> Quantity exceeds the
          remaining ungraded quantity.
        </p>
      )}
      <button
        onClick={() => onSubmit()}
        className="rounded-full bg-primary-color text-white hover:scale-105 w-[150px] mx-auto mt-auto py-2 px-5 mb-5 "
      >
        Save
      </button>
    </div>
  );
};

export default InventoryUpdateForm;
