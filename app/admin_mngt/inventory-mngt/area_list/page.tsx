import { AddNewButton, SearchBar } from "@/components"

const AreaList = () => {
  return (
    <div className='out ml-3 pt-4 px-4 max-h-[750px] h-full w-full rounded-lg'>
     <div className="out flex justify-between"> 
      <div > <SearchBar/> </div>
      <div > <AddNewButton/></div>
     </div>
     <div className="out">
      table here
     </div>
    </div>
  )
}

export default AreaList