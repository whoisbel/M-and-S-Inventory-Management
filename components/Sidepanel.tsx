const Sidepanel = () => {
  return (
    <div className="sticky top-0 left-0 h-full bg-primary-green rounded-lg hidden md:block">
      <ul className="text-[30px] flex justify-center">
        <li className="hover:bg-green-600 px-5 py-2 border-custom-white mt-3 border-y-[1px] cursor-pointer">
          # Dashboard
        </li>
      </ul>
    </div>
  );
};

export default Sidepanel;
