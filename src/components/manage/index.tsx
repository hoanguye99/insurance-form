import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import AdminMainTable from 'components/common/order-view-table/admin-main-table'
import { TableEmpty } from 'components/common/order-view-table/common/pure-functions'
import {
  getAllOrdersAsync,
  selectOrderList,
  selectStatus,
} from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse } from 'models/api'
import { useEffect } from 'react'

const Manage = () => {
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
            <AdminMainTable />
          </OrderViewTable>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Manage
