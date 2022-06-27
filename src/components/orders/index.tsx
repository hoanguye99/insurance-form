import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import { TableEmpty } from 'components/common/order-view-table/common/pure-functions'
import UserMainTable from 'components/common/order-view-table/user-main-table'
import {
  selectOrderList,
  selectStatus,
} from 'features/order/order-list-slice'

const Orders = () => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(getAllOrdersAsync())
  // }, [])

  const orderStatus = useAppSelector(selectStatus)
  const orderList = useAppSelector(
    selectOrderList
  )

  return (
    <div className="container mx-auto">
      <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
        Đơn hàng
      </p>
      <div className="overflow-x-auto">
        <OrderViewTable
          loadingStatus={orderStatus}
          isTableEmpty={"ins" in orderList && orderList.ins.length === 0}
          TableEmpty={<TableEmpty />}
        >
          <UserMainTable />
        </OrderViewTable>
      </div>
    </div>
  )
}

export default Orders
