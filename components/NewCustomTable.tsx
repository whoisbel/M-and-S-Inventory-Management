import { table } from "console"


const NewCustomTable = () => {
  return (
    <table align="left" className="table-auto border-l-0 border-r-0 border-t-0 rounded-none w-full">
        <thead>
            <tr>
                <th className="header-border">
                    Date
                </th>
                <th className="header-border">
                    Venue
                </th>
                <th className="header-border">
                    Event
                </th>
                <th className="header-border">
                    User
                </th>
                <th className="header-border">
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