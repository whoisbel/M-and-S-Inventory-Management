"use client";
import Swal from "sweetalert2";
import { Grade } from "@prisma/client";
import { useState, useEffect } from "react";
import { categoryFormData } from "@/types";
import { InventoryInputForm } from "@/components";
import { CgAdd } from "react-icons/cg";
import { BiError } from "react-icons/bi";
import { swalCustomClass } from "@/utils/swalConfig";

const SortModal = ({
  inventoryData,
  swal,
  grade,
  setSwalShown,
  inventoryId,
}: {
  inventoryData: string[];
  swal: typeof Swal;
  grade: Grade[];
  setSwalShown: (val: boolean) => void;
  inventoryId?: number;
}) => {
  const [categoryFormData, setCategoryFormData] = useState<categoryFormData[]>(
    []
  );
  const [ungradedQuantity, setUngradedQuantity] = useState(
    Number(inventoryData[3])
  );
  const [isQuantityError, setIsQuantityError] = useState(false);
  const [isError, setIsError] = useState(false);

  const createInventoryForm = () => {
    const newData: categoryFormData = {
      grade: grade[0].id,
      quantity: 0,
      isWashed: false,
    };
    setCategoryFormData([...categoryFormData, newData]);
  };

  useEffect(() => {
    computeUngradedQuantity();
  }, [categoryFormData]);

  const handleInventoryFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newCategoryFormData = [...categoryFormData];
    const field = e.target.name;
    console.log(e.target.name);
    if (e.target.name === "isWashed") {
      newCategoryFormData[index][field] = !newCategoryFormData[index][field];
    } else {
      newCategoryFormData[index][field] = Number(e.target.value);
      setCategoryFormData(newCategoryFormData);
    }
  };

  const handleRemoveForm = (index: number) => {
    const newCategoryFormData = [...categoryFormData];
    newCategoryFormData.splice(index, 1);
    setCategoryFormData(newCategoryFormData);
  };

  const computeUngradedQuantity = () => {
    let sortedQuantity = 0;
    categoryFormData.map((data) => {
      sortedQuantity += Number(data.quantity);
    });
    const ungradedQuantity = Number(inventoryData[3]) - sortedQuantity;
    setUngradedQuantity(ungradedQuantity);
    if (ungradedQuantity < 0) {
      setIsQuantityError(true);
    } else {
      setIsQuantityError(false);
      setIsError(false);
    }
  };

  const saveForm = async () => {
    if (isQuantityError) {
      setIsError(true);
    } else {
      const response = await fetch("/api/inventory/inventory", {
        method: "POST",
        body: JSON.stringify({
          categoryFormData: categoryFormData,
          inventoryId: inventoryId,
        }),
      });
      if (response.ok) {
        swal
          .fire({
            title: "Success",
            icon: "success",
            text: "Inventory Saved",
            customClass: swalCustomClass,
          })
          .then(() => {
            location.reload();
          });
      } else {
        swal.fire({
          title: "error",
          customClass: swalCustomClass,
        });
      }
      setSwalShown(false);
    }
  };
  return (
    <div className="flex bg-white min-w-[900px] min-h-[400px] flex-col text-black rounded">
      <div className=" bg-accent-gray flex items-center p-3">
        <b>Inventory</b>
      </div>
      <div className="px-3 flex flex-col gap-3">
        <div className="flex gap-3 items-center  py-1 text-[20px]">
          <label>Date:</label>
          <input
            type="text"
            name="date"
            className="h-[20px] py-3 px-1 border-2 border-add-minus"
            value={inventoryData[0]}
            readOnly
          />
          <label>Area</label>
          <input
            type="text"
            name="area"
            className="h-[20px] py-3 px-1 border-2 border-add-minus"
            value={inventoryData[1]}
            readOnly
          />
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            className={`h-[20px] py-3 px-1 border-2 border-add-minus ${
              isQuantityError && "text-red-600"
            }`}
            value={ungradedQuantity}
            readOnly
          />
          <button
            className="px-3 py-2 shadow-neutral-600 border-add-minus shadow button hover:bg-neutral-500 bg-accent-gray border-[1px] rounded flex"
            onClick={() => {
              createInventoryForm();
            }}
          >
            Add New
            <CgAdd />
          </button>
        </div>
        <div className="py-2 h-[500px] overflow-y-auto flex  flex-col gap-3">
          {categoryFormData.map((data, index) => (
            <InventoryInputForm
              handleChange={handleInventoryFormChange}
              handleDelete={handleRemoveForm}
              inventoryFormData={data}
              grade={grade}
              index={index}
              key={index}
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
            onClick={() => {
              saveForm();

              console.log(categoryFormData);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
