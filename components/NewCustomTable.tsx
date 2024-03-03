import { table } from "console"


const NewCustomTable = () => {
  return (
    <table className="table-auto rounded-none w-full">
        <thead>
            <tr>
                <th>
                    Date
                </th>
                <th>
                    Venue
                </th>
                <th>
                    Event
                </th>
                <th>
                    User
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="body_border">
                    date description
                </td>
                <td className="body_border">
                    venue description
                </td>
                <td className="body_border">
                    event description
                </td>
                <td className="body_border">
                    user name
                </td>
                <td className="body_border">
                    buttons here
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default NewCustomTable