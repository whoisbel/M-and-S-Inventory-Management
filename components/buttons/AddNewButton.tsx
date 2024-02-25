import { FaPlus } from "react-icons/fa"


const AddNewButton = () => {
  return (
    <div>
      <button
          className="flex justify-evenly
          bg-accent-gray border-[1px] 
          border-add-minus py-2 px-4 
          ml-auto rounded-lg shadow 
          font-semibold w-[150px]"
        >
          Add New <FaPlus className="text-[20px] fill-add-minus" />
      </button>
    </div>
  )
}

export default AddNewButton