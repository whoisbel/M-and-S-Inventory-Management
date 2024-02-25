import { AddNewButton, AdminTable, SearchBar } from "@/components"

const GradeAndPrice = () => {
  return (
    <div className='ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg'>
    <div className="flex justify-between mb-2"> 
     <div > <SearchBar/> </div>
     <div > <AddNewButton/></div>
    </div>
    <div className=" flex flex-col">
     <span className="text-[20px] bold">Grade and Price List</span>
     <AdminTable/>
    </div>
   </div>
  )
}

export default GradeAndPrice