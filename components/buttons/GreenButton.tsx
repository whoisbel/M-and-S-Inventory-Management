"use client";
import { usePathname } from "next/navigation";

const GreenButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={onClick}
        className="bg-primary-color w-full px-4 h-[35px] text-[15px] text-center text-white rounded-full hover:bg-green-hover"
      >
        {children}
      </button>
    </div>
  );
};

export default GreenButton;
