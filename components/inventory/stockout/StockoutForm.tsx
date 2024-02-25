import { Stockout } from "@prisma/client";
import { CgClose } from "react-icons/cg";
import { FaMinus } from "react-icons/fa";
const StockoutForm = ({
  stockout,
  index,
  handleDelete,
}: {
  stockout?: Stockout;
  index: number;
  handleDelete: (index: number) => void;
}) => {
  return (
    <div className="bg-accent-gray shadow w-full min-h-[54px] flex gap-5 p-2 border-add-minus border-[1px] rounded-lg overflow-auto items-center">
      <label>Grade:</label>
      <select
        name=""
        id=""
        className="h-[20px] py-3 px-1 border-2 border-add-minus text-black"
        defaultValue=""
        onChange={() => {}}
      >
        <option value="">Select grade</option>
      </select>
      <label>Washed:</label>
      <input
        type="checkbox"
        name="washed"
        className="h-[20px] py-3 px-1 border-2 border-add-minus"
        value={0}
        readOnly
      />
      <label>Quantity:</label>
      <input
        type="number"
        name="quantity"
        className="h-[20px] py-3 px-1 border-2 border-add-minus"
        value={stockout?.quantity}
        onChange={() => {}}
      />
      <button
        className="ml-auto h-full text-[30px]"
        onClick={() => {
          console.log(index);
          handleDelete(index);
        }}
      >
        <FaMinus className="fill-add-minus " />
      </button>
    </div>
  );
};

export default StockoutForm;
