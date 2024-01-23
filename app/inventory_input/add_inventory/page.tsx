"use client";
import { ChangeEvent, useState } from "react";
import { InventoryInputForm } from "@/components";
import { FaPlus } from "react-icons/fa";
import { addFormData } from "@/types";

const AddInventory = () => {
  const [addFormData, setAddFormData] = useState<addFormData[]>([]);

  const handleCreateNewForm = () => {
    const newForm = {
      date: new Date().toISOString().slice(0, 10),
      area: "",
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
    setAddFormData(newAddFormData);
  };
  const handleRemoveForm = (index: number) => {
    const newAddFormData = [...addFormData];
    newAddFormData.splice(index, 1);
    setAddFormData(newAddFormData);
  };

  const handleSaveForm = () => {
    /*fetch('api/inventory_input/add_inventory/', {
      method: "POST",
      body: addFormData
    })
    */
  };
  return (
    <div className=" w-full h-full bg-white text-black p-7 flex flex-col gap-3">
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
          />
        ))}
      </div>
      <button
        className="bg-accent-gray py-2 px-7 border-2 font-semibold rounded-xl border-primary-color mt-auto ml-auto w-[150px]"
        onClick={() => {
          console.log(addFormData);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default AddInventory;
