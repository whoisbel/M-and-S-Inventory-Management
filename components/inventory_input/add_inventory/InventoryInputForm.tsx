import { ChangeEvent } from "react";
import { FaMinus } from "react-icons/fa";
import { inventoryInputData } from "@/types";
import { Area, Grade } from "@prisma/client";
const InventoryInputForm = ({
  handleChange,
  handleDelete,
  inventoryFormData,
  index,
  grade,
  area,
}: {
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleDelete: (index: number) => void;
  inventoryFormData: inventoryInputData;
  index: number;
  grade?: Grade[];
  area?: Area[];
}) => {
  return (
    <div className="bg-accent-gray shadow w-full min-h-[54px] flex gap-5 p-2 border-add-minus border-[1px] rounded-lg overflow-auto items-center">
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
                {grade?.map((grade) => (
                  <option key={grade.id} value={grade.description}>
                    {grade.description}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (key === "area") {
          return (
            <div key={index}>
              <label htmlFor="area" className="font-semibold">
                Area:{" "}
              </label>

              <select
                name="area"
                className="form_input ml-3 min-w-[150px] text-center"
                onChange={(e) => handleChange(e, index)}
              >
                {area?.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.description}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (key === "date") {
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
