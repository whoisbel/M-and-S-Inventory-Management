import { customTableProps } from "@/types";
import { BiEdit, BiTrash } from "react-icons/bi";

/* 
  Custom Table 
  params: 
  array of string for the table headers,
  object where key is type number and returns a array value,
  handleDelete a function (id: number) => {delete}
  handleUpdate (id: number) => update,
  ex. Usage
  const headers = ['id','name', 'age' ]
  cosnt data = {
    1: [1, 'name1', 23]
    2: [2, 'name2', 23]
  }
*/
const CustomTable = ({
  headers,
  data,
  handleDelete,
  handleUpdate,
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
        {Object.keys(data).length == 0 && (
          <tr>
            <td colSpan={headers.length} className="text-[20px]">
              No data
            </td>
          </tr>
        )}
        {Object.keys(data).map((key, ind) => {
          const row = data[Number(key)];

          return (
            <tr key={key}>
              {row.map((data, index) => {
                if (data.includes("update") && data.includes("delete")) {
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
                } else if (data.includes("update")) {
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
                    </td>
                  );
                } else if (data.includes("delete")) {
                  return (
                    <td key={index}>
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
