import ApproveButton from './buttons/ApproveButton';
import DenyBUtton from "./buttons/DenyBUtton"


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
              <ApproveButton/>
              </div>
              <div>
              <DenyBUtton/>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AdminTable