import { CreateOrderFormData } from 'models/api'
import UserActionButton from '../../user-group-table/user-action-button'

interface ChassisColumnProps extends CreateOrderFormData {}

const ChassisColumn = (props: ChassisColumnProps) => {

  return (
    <div className="flex justify-between items-center !pr-3">
      <span>{props.chassisNo}</span>
      {<UserActionButton {...props} />}
    </div>
  )
}

export default ChassisColumn
