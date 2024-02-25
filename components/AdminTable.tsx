import { GreenButton, RedButton } from "."



const AdminTable = ({


}) => {
  return (
    <table align="left" className="admin_border rounded-none w-auto">
      <tbody >
        <tr>
          <td className="body_border">name here</td>
          <td className="body_border">
            <div className="flex justify-end">
              <div className='mr-1'>
              <GreenButton/>
              </div>
              <div>
              <RedButton/>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AdminTable