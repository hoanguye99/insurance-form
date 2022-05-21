import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import {
  getAllOrdersAsync,
  selectOrderList,
} from 'features/order/order-list-slice'
import { useEffect } from 'react'

const Manage = () => {
  const orderList = useAppSelector(selectOrderList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (Object.keys(orderList).length === 0) {
      dispatch(getAllOrdersAsync())
    }
  }, [orderList])

  return <OrderViewTable />
}

export default Manage
