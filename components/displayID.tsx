import React from 'react'

function DisplayID() {

    const id = "123456AAD"
  return (
    <div className="w-full flex items-end justify-end">
      <div className="bg-custom-white rounded-xl w-[200px] h-[40px] flex justify-center items-center">
        <p className="text-[20px] text-letters-color p-4">ID:</p>
        <p className="text-[20px] text-letters-color p-4">{id}</p>
      </div>
    </div>
  )
}

export default DisplayID