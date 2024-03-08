import { DownloadButton, NewCustomTable } from "@/components";

const history = () => {
  return <div className="h-full w-full bg-white text-black">
          <div className="flex justify-end">
            <DownloadButton onClick={function (): void {
        throw new Error("Function not implemented.");
      } } />
          </div>
          <div className="overflow-auto max-h-[550px] mr-5 ml-5 mb-5">
            <NewCustomTable />
          </div>
        </div>;
};

export default history;
