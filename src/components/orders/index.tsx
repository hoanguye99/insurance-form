import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import { TableEmpty } from 'components/common/order-view-table/common/pure-functions'
import UserMainTable from 'components/common/order-view-table/user-main-table'
import {
  getAllOrdersAsync,
  selectOrderList,
  selectStatus,
} from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse } from 'models/api'
import { useEffect } from 'react'

const Orders = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllOrdersAsync())
  }, [])

  const orderStatus = useAppSelector(selectStatus)
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  return (
    <div className="container mx-auto">
      <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
        Đơn hàng
      </p>
      {orderList.ins ? (
        <div className="overflow-x-auto">
          <OrderViewTable
            loadingStatus={orderStatus}
            isTableEmpty={orderList.ins.length === 0}
            TableEmpty={<TableEmpty />}
          >
            <UserMainTable />
          </OrderViewTable>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Orders
