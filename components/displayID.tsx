function DisplayID() {
  const id = "123456AAD";
  return (
    <div className="ml-auto  bg-custom-white rounded-xl w-[200px] h-[40px] flex justify-center items-center">
      <p className="text-[20px] text-letters-color p-4">ID:</p>
      <p className="text-[20px] text-letters-color p-4">{id}</p>
    </div>
  );
}

export default DisplayID;
