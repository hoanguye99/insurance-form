import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { InsuranceOrder } from 'models/api'
import AdminActionButton from '../../admin-main-table/admin-action-button'
import UserActionButton from '../../user-main-table/user-action-button'

interface EndDateColumnProps extends InsuranceOrder {}

const EndDateColumn = (props: EndDateColumnProps) => {
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
      <p>{props.endDate}</p>
      {actionButton}
    </div>
  )
}

export default EndDateColumn
