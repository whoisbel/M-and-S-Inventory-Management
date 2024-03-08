"use client";
import { ChangeEvent, useState } from "react";
import { InventoryInputForm, GreenButton } from "@/components";
import { FaPlus } from "react-icons/fa";
import { addFormData } from "@/types";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { swalCustomClass } from "@/utils/swalConfig";
const AddInventory = () => {
  const [addFormData, setAddFormData] = useState<addFormData[]>([]);
  const [area, setArea] = useState([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const swal = withReactContent(Swal);

  useEffect(() => {
    const fetchArea = async () => {
      const response = await fetch("/api/inventory_input/add_inventory");
      if (response.ok) {
        setArea(await response.json());
      }
    };
    fetchArea();
  }, []);

  const handleCreateNewForm = () => {
    const newForm = {
      area: "1",
      quantity: 0,
    };
    setAddFormData([...addFormData, newForm]);
  };
  const handleAddFormChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const field = e.target.name;
    const newAddFormData = [...addFormData];
    newAddFormData[index][field] = e.target.value;
    console.log(e.target.value);
    setAddFormData(newAddFormData);
  };
  const handleRemoveForm = (index: number) => {
    const newAddFormData = [...addFormData];
    newAddFormData.splice(index, 1);
    setAddFormData(newAddFormData);
  };

  const handleSaveForm = async () => {
    if (addFormData.length != 0) {
      const response = await fetch("/api/inventory_input/add_inventory", {
        method: "POST",
        body: JSON.stringify({ addFormData, date }),
      });
      if (response.ok) {
        swal
          .fire({
            title: "Harvest Added",
            icon: "success",

            customClass: swalCustomClass,
          })
          .then(() => {
            setAddFormData([]);
          });
      }
    } else {
      swal.fire({
        title: "Error",
        icon: "error",
        customClass: swalCustomClass,
      });
    }
    console.log(addFormData);
  };
  return (
    <div className=" w-full h-full bg-white  text-black  flex flex-col gap-3">
      <div className="bg-accent-gray py-2 px-3 flex gap-2">
        <label>Area:</label>
        <input
          type="date"
          className="px-2"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col w-full h-full p-3 gap-3">
        <button
          onClick={() => {
            handleCreateNewForm();
          }}
          className="flex justify-evenly bg-accent-gray border-[1px] border-add-minus py-2 px-4 ml-auto rounded-lg shadow mb-5 gap-4 font-semibold w-[200px]"
        >
          Create New <FaPlus className="text-[20px] fill-add-minus" />
        </button>
        <div className="flex flex-col gap-3">
          {addFormData.map((data, index) => (
            <InventoryInputForm
              key={index}
              handleChange={handleAddFormChange}
              handleDelete={handleRemoveForm}
              inventoryFormData={data}
              index={index}
              area={area}
            />
          ))}
        </div>
        <div className="mt-auto ml-auto w-[150px]">
          <GreenButton
            onClick={() => {
              handleSaveForm();
            }}
          >
            Save
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
