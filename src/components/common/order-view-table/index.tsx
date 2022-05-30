import { useAppSelector } from 'app/hooks'
import { selectOrderList, selectStatus } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse } from 'models/api'
import { TableEmpty, TableSpinner } from './common'
import MainTable from './main-table'

const OrderViewTable = () => {
  const orderStatus = useAppSelector(selectStatus)
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
              ) : (
                <MainTable />
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
