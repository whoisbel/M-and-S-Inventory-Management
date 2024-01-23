"use client";
import { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { InventoryInputForm } from "@/components";
import { categoryFormData } from "@/types";

const Categorize = () => {
  const [categoryFormData, setCategoryFormData] = useState<categoryFormData[]>(
    []
  );

  const grade = ["grade 1", "grade 2", "grade 3", "grade 4"];

  const handleCategoryFormAdd = () => {
    const categoryForm: categoryFormData = {
      grade: "",
      quantity: 0,
    };
    setCategoryFormData([...categoryFormData, categoryForm]);
  };

  const handleCategoryFormChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const field = e.target.name;
    const newCategoryFormData = [...categoryFormData];
    newCategoryFormData[index][field] = e.target.value;
    setCategoryFormData(newCategoryFormData);
  };
  const handleCategoryFormRemove = (index: number) => {
    const newCategoryFormData = [...categoryFormData];
    newCategoryFormData.splice(index, 1);
    setCategoryFormData(newCategoryFormData);
  };

  return (
    <div className="h-full w-full bg-white text-black flex flex-col">
      <div className="bg-accent-gray py-2 ">
        <label>Area:</label>
        <input
          type="text"
          name="area"
          className="mx-2 border-[1px] border-add-minus"
        />
        <label className="ml-2">Unclassified:</label>
        <input
          type="text"
          name="unclassified"
          className="mx-2 border-[1px] border-add-minus"
        />
      </div>
      <div className="h-full w-full  p-3 flex flex-col gap-3">
        <button
          onClick={() => {
            handleCategoryFormAdd();
          }}
          className="mt-2 flex justify-evenly bg-accent-gray border-[1px] border-add-minus py-2 px-4 ml-auto rounded-lg shadow mb-5 gap-4 font-semibold w-[200px]"
        >
          Create New <FaPlus className="text-[20px] fill-add-minus" />
        </button>
        <div className="h-full flex flex-col gap-3">
          {categoryFormData.map((data, index) => (
            <InventoryInputForm
              key={index}
              handleChange={handleCategoryFormChange}
              handleDelete={handleCategoryFormRemove}
              grade={grade}
              index={index}
              inventoryFormData={data}
            />
          ))}
        </div>
        <button className="bg-accent-gray py-2 px-7 border-2 font-semibold rounded-xl border-primary-color mt-auto ml-auto w-[150px]">
          Save
        </button>
      </div>
    </div>
  );
};

export default Categorize;
