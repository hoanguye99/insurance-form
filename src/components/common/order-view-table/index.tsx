import { useAppSelector } from 'app/hooks'
import { selectOrderList, selectStatus } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse } from 'models/api'
import { TableEmpty, TableSpinner } from './common/pure-functions'
import { selectUserDetail } from 'features/auth/user-login-slice'
import AdminMainTable from './admin-main-table'
import UserMainTable from './user-main-table'

const OrderViewTable = () => {
  const orderStatus = useAppSelector(selectStatus)
  const userDetail = useAppSelector(selectUserDetail)
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  switch (orderStatus) {
    case 'loading':
      return <TableSpinner />
    case 'idle':
      return (
        <div className="container mx-auto">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đơn hàng
          </p>
          <div className="overflow-x-auto">
            {orderList.ins ? (
              orderList.ins.length === 0 ? (
                <TableEmpty />
              ) : userDetail.role === 'ADMIN' ? (
                <AdminMainTable />
              ) : userDetail.role === 'USER' ? (
                <UserMainTable />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      )
    default:
      return <div>An error happened</div>
  }
}

export default OrderViewTable
