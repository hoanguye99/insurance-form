import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import {
  getAllOrdersAsync,
  selectOrderList,
} from 'features/order/order-list-slice'
import { useEffect } from 'react'

const Manage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(getAllOrdersAsync())
  }, [])

  return <OrderViewTable />
}

export default Manage
