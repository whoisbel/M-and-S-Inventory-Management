import { AddNewButton, SearchBar } from "@/components"
import AdminTable from '../../../../components/AdminTable';

const AreaList = () => {
  return (
    <div className='ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg'>
     <div className="flex justify-between"> 
      <div > <SearchBar/> </div>
      <div > <AddNewButton/></div>
     </div>
     <div className=" flex flex-col">
      <span className="text-[20px] bold">Area List</span>
      <AdminTable/>
     </div>
    </div>
  )
}

export default AreaList