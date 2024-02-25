import { BiSearch } from "react-icons/bi"

const SearchBar = () => {
  return (
    <div className="flex-1 flex items-center ">
    <input
      type="text" 
      name="search"
      id="search"
      placeholder="Search"
      className="border border-a rounded-lg  h-[30px] pl-2"
    />
    <BiSearch className="-ml-[1.25em] text-primary-color" />
  </div>
  )
}

export default SearchBar