import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/common'
import AdminActionButton from '../admin-action-button'
import UserActionButton from '../user-action-button'

interface StatusColumnProps extends InsuranceOrder {}

const StatusColumn = (props: StatusColumnProps) => {
  const userDetail = useAppSelector(selectUserDetail)

  let actionButton
  switch (userDetail.role) {
    case 'ADMIN':
      actionButton = <AdminActionButton {...props} />
      break
    case 'USER':
      actionButton = <UserActionButton {...props} />
      break
  }

  let showStatus
  switch (props.status) {
    case OrderStatus.APPROVED:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-green-500 bg-green-200">
          Approved
        </div>
      )
      break
    case OrderStatus.PENDING:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-yellow-500 bg-yellow-50">
          Pending
        </div>
      )
      break
    case OrderStatus.REJECTED:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-red-500 bg-red-50">
          Rejected
        </div>
      )
      break
  }

  return (
    <div className="flex justify-between items-center !pr-3">
      {showStatus}
      {actionButton}
    </div>
  )
}

export default StatusColumn
