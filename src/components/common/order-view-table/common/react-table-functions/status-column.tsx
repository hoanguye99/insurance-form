import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { InsuranceOrder } from 'models/api'
import AdminActionButton from '../../admin-main-table/admin-action-button'
import { StatusSpan } from '../pure-functions'
import UserActionButton from '../../user-main-table/user-action-button'

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
  

  return (
    <div className="flex justify-between items-center !pr-3">
      <StatusSpan status={props.status} />
      {actionButton}
    </div>
  )
}

export default StatusColumn
