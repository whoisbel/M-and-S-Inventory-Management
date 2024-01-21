import dashboardIcon from "../public/dashboard-icon.svg";
import Image from "next/image";
const Sidepanel = () => {
  return (
    <div className="sticky top-0 left-0 h-full bg-primary-green rounded-lg hidden md:block bg-primary-color">
      <ul className="text-[30px] flex justify-center">
        <div className="flex hover:bg-main-background hover:text-letters-color items-center justify-center mt-4 p-2.5">
          <Image
            src={dashboardIcon}
            alt="icon"
            width={50}
            height={30}
            className="fill-slate-800"
          />
          <li className="p-2 cursor-pointer self-center">Dashboard</li>
        </div>
      </ul>
    </div>
  );
};

export default Sidepanel;
