import { addFormData } from "@/types";
import { ChangeEvent } from "react";
import { FaMinus } from "react-icons/fa";
import { TfiMinus } from "react-icons/tfi";

const AddForm = ({
  handleChange,
  handleDelete,
  addFormData,
  index,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  handleDelete: (index: number) => void;
  addFormData: addFormData;
  index: number;
}) => {
  return (
    <div className="bg-accent-gray w-full flex gap-5 p-2 border-add-minus border-[1px] rounded-lg overflow-auto items-center">
      <div className="">
        <label className="font-semibold">Date:</label>
        <input
          type="date"
          name="date"
          className="form_input ml-3"
          value={addFormData.date}
          onChange={(e) => handleChange(e, index)}
        />
      </div>
      <div className="">
        <label className="font-semibold">Area:</label>
        <input
          type="text"
          name="area"
          className="form_input ml-3"
          value={addFormData.area}
          onChange={(e) => handleChange(e, index)}
        />
      </div>
      <div className="">
        <label className="font-semibold">Quantity:</label>
        <input
          type="number"
          className="form_input ml-3"
          name="quantity"
          value={`${addFormData.quantity != 0 ? addFormData.quantity : ""}`}
          onChange={(e) => handleChange(e, index)}
        />
      </div>

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

export default AddForm;
