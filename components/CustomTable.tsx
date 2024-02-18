import { customTableProps } from "@/types";
import { BiEdit, BiTrash } from "react-icons/bi";
import { LoadingRing } from ".";
/* 
  Custom Table 
  params: 
  array of string for the table headers,
  object where key is type number and returns a array value,
  handleDelete a function (id: number) => {delete}
  handleUpdate (id: number) => update,
  ex. Usage
  const headers = ['id','name', 'age' , 'actions']
  cosnt data = {
    1: [1, 'name1', 23, 'update delete']
    2: [2, 'name2', 23, 'delete']  //pwede ra update or delete or both make sure lang nga naay update and delete functions para di 
                                      mag error inig click
  }
  
*/
const CustomTable = ({
  headers,
  data,
  handleDelete,
  handleUpdate,
  isLoading = false,
}: customTableProps) => {
  return (
    <table
      border={1}
      align="center"
      className="w-full rounded border-[1px] border-accent-green text-center"
    >
      <thead className="bg-accent-gray rounded p-2">
        <tr>
          {headers.map((header, ind) => (
            <th key={ind}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {!isLoading && Object.keys(data).length == 0 && (
          <tr>
            <td colSpan={headers.length} className="text-[20px]">
              No data
            </td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td colSpan={headers.length} className="text-[20px]">
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
                      data.includes("update") &&
                      data.includes("delete")
                    ) {
                      return (
                        <td key={index}>
                          <button
                            onClick={(e) => {
                              handleUpdate!(Number(key));
                            }}
                            className="bg-primary-color hover:bg-green-700 text-white px-2 py-2 rounded shadow"
                          >
                            <BiEdit className="w-7 h-7" />
                          </button>{" "}
                          <button
                            onClick={(e) => {
                              handleDelete!(Number(key));
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white px-2 py-2 rounded shadow"
                          >
                            <BiTrash className="w-7 h-7" />
                          </button>
                        </td>
                      );
                    } else if (data && data.includes("update")) {
                      return (
                        <td key={index}>
                          <button
                            onClick={(e) => {
                              handleUpdate!(Number(key));
                            }}
                            className="bg-primary-color hover:bg-green-700 text-white px-2 py-2 rounded shadow hover:scale-105"
                          >
                            <BiEdit className="w-7 h-7" />
                          </button>{" "}
                        </td>
                      );
                    } else if (data && data.includes("delete")) {
                      return (
                        <td key={index}>
                          <button
                            onClick={(e) => {
                              handleDelete!(Number(key));
                            }}
                            className="bg-red-500  text-white px-2 py-2 rounded shadow hover:bg-red-700 hover:scale-105"
                          >
                            <BiTrash className="w-7 h-7" />
                          </button>
                        </td>
                      );
                    } else {
                      return <td key={index}>{data}</td>;
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
