import { AddNewButton, AdminTable, SearchBar } from "@/components"

const ManageUsers = () => {
  return (
    <div className='ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg'>
    <div className="flex justify-between mb-5"> 
    <SearchBar/>
    </div>
    <div className=" flex flex-col">
     <span className="text-[20px] bold">
        Manage Users</span>
     <AdminTable/>
    </div>
   </div>
  )
}

export default ManageUsers