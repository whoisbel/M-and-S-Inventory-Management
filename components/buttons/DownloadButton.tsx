import { IoMdDownload } from "react-icons/io";

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <div className="icon-button cursor-pointer" onClick={onClick}>
      <IoMdDownload className=" w-[30px] h-[30px] text-add-minus" />
    </div>
  );
};

export default DownloadButton;
