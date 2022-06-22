import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { InsuranceOrder } from 'models/api'
import AdminActionButton from '../../admin-main-table/admin-action-button'
import UserActionButton from '../../user-main-table/user-action-button'

interface PriceColumnProps extends InsuranceOrder {}

const PriceColumn = (props: PriceColumnProps) => {
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
      <span>25.000đ</span>
      {actionButton}
    </div>
  )
}

export default PriceColumn
