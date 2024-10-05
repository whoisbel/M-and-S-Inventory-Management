import { customTableProps } from "@/types";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsBagXFill } from "react-icons/bs";
import { LuSendToBack } from "react-icons/lu";
import { GiStockpiles } from "react-icons/gi";
import { LoadingRing } from ".";
const CustomTable = ({
  headers,
  data,
  handleDelete,
  handleUpdate,
  isLoading = false,
  handleStockout,
}: customTableProps) => {
  let UpdateButton = ({ keyNo }: { keyNo: number }) => <></>;
  let DeleteButton = ({ keyNo }: { keyNo: number }) => <></>;
  let StockoutButton = ({ keyNo }: { keyNo: number }) => <></>;
  if (handleUpdate) {
    UpdateButton = function ({ keyNo }: { keyNo: number }) {
      return (
        <button
          onClick={(e) => {
            handleUpdate!(+keyNo);
          }}
          className="bg-primary-color hover:bg-green-700 text-white px-2 py-2 rounded shadow hover:scale-105"
        >
          <BiEdit className="w-7 h-7" />
        </button>
      );
    };
  }
  if (handleDelete) {
    DeleteButton = ({ keyNo }: { keyNo: number }) => (
      <button
        onClick={(e) => {
          handleDelete!(+keyNo);
        }}
        className="bg-red-500  text-white px-2 py-2 rounded shadow hover:bg-red-700 hover:scale-105"
      >
        <BiTrash className="w-7 h-7" />
      </button>
    );
  }
  if (handleStockout) {
    StockoutButton = ({ keyNo }: { keyNo: number }) => (
      <button
        onClick={(e) => {
          handleStockout(+keyNo);
        }}
        className="bg-add-minus hover:bg-slate-400 text-white px-2 py-2 rounded shadow hover:scale-105"
      >
        <BsBagXFill className="w-7 h-7" />
      </button>
    );
  }

  return (
    <table align="left" className="table-auto border-0 rounded-none w-full">
      <thead>
        <tr>
          {headers.map((header, ind) => (
            <th className="header-border" key={ind}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {!isLoading && Object.keys(data).length == 0 && (
          <tr>
            <td colSpan={headers.length} className="body_border" align="center">
              No data
            </td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td colSpan={headers.length} className="body_border">
              <LoadingRing width={50} height={50} title="Getting data..." />
            </td>
          </tr>
        )}

        {!isLoading &&
          Object.keys(data)
            .reverse()
            .map((key, ind) => {
              const row = data[Number(key)];
              return (
                <tr key={key}>
                  {row.map((data, index) => {
                    if (
                      data &&
                      (data.includes("update") ||
                        data.includes("delete") ||
                        data.includes("stockout"))
                    ) {
                      return (
                        <td className="body_border" align="right" key={index}>
                          {data.includes("stockout") && (
                            <StockoutButton keyNo={+key} />
                          )}{" "}
                          {data.includes("update") && (
                            <UpdateButton keyNo={+key} />
                          )}{" "}
                          {data.includes("delete") && (
                            <DeleteButton keyNo={+key} />
                          )}
                        </td>
                      );
                    } else {
                      // Check if the header is "Quantity" and append "KG"
                      const header = headers[index];
                      const displayData =
                        header.toLowerCase() === "quantity" ? `${data} KG` : data;
                      return (
                        <td className="body_border" key={index}>
                          {displayData}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
      </tbody>
    </table>
  );
};

export default CustomTable;
