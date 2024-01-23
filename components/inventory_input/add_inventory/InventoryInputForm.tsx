import { ChangeEvent } from "react";
import { FaMinus } from "react-icons/fa";
import { inventoryInputData } from "@/types";

const InventoryInputForm = ({
  handleChange,
  handleDelete,
  inventoryFormData,
  index,
  grade,
}: {
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleDelete: (index: number) => void;
  inventoryFormData: inventoryInputData;
  index: number;
  grade?: string[];
}) => {
  console.log(inventoryFormData);
  return (
    <div className="bg-accent-gray w-full min-h-[54px] flex gap-5 p-2 border-add-minus border-[1px] rounded-lg overflow-auto items-center">
      {Object.keys(inventoryFormData).map((key) => {
        let type = "text";
        switch (key) {
          case "date":
            type = "date";
            break;
          case "quantity":
            type = "number";
            break;
        }
        if (key === "grade") {
          return (
            <div key={index}>
              <label htmlFor="grade" className="font-semibold">
                Grade:{" "}
              </label>
              <select
                name="grade"
                className="form_input ml-3 min-w-[150px] text-center"
                onChange={(e) => handleChange(e, index)}
              >
                {grade?.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div key={key}>
              <label className="font-semibold">{`${key
                .charAt(0)
                .toUpperCase()}${key.substring(1)}`}</label>
              <input
                type={type}
                name={key}
                className="form_input ml-3"
                value={
                  inventoryFormData[key] === 0 ? "" : inventoryFormData[key]
                }
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          );
        }
      })}

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

export default InventoryInputForm;
