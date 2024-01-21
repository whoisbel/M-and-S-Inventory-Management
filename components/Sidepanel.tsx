'use client'
import { LuLayoutDashboard } from 'react-icons/lu';
import Link from 'next/link';
import { TfiWrite } from "react-icons/tfi";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidepanel = () => {
  const pathname = usePathname()
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };
  // active:bg-main-background active:text-letters-color
  return (
    <div className="sticky top-0 left-0 h-full bg-primary-green rounded-lg hidden md:block bg-primary-color">
      <ul className="text-[30px] flex flex-col">
      <div className={isClicked ? 'flex items-center justify-center mt-4 p-2.5 bg-main-background text-letters-color' : 'flex items-center justify-center mt-4 p-2.5 bg-primary-color'} onClick={handleClick}>
        <LuLayoutDashboard className={isClicked ? 'text-primary-color w-11 h-11' : 'text-main-background w-11 h-11'}/>
        <Link className="p-2 cursor-pointer self-center font-bold" href="/">
          Dashboard
        </Link>
      </div>
      <div className={isClicked ? 'flex items-center justify-center mt-4 p-2.5 bg-main-background text-letters-color' : 'flex items-center justify-center mt-4 p-2.5 bg-primary-color'} onClick={handleClick}>
        <TfiWrite className={isClicked ? 'text-primary-color w-11 h-11' : 'text-main-background w-11 h-11'}/>
        <Link className="p-2 cursor-pointer self-center font-bold" href="/">
          Inventory Input
        </Link>
      </div>
      </ul>
    </div>
  );
};

export default Sidepanel;