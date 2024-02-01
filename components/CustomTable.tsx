import { customTableProps } from "@/types";

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
        {data.map((row, ind) => (
          <tr key={ind}>
            {row.map((data, index) => (
              <td key={index}>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
