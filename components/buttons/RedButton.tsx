"use client";
import { usePathname } from "next/navigation";

const RedButton = ({
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
        className="bg-custom-red hover:bg-red-hover w-full px-4 h-[35px] text-[15px] text-center text-white rounded-full"
      >
        {children}
      </button>
    </div>
  );
};

export default RedButton;
