import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { getAllOrdersAsync, selectOrderList } from 'features/order/order-list-slice'
import React, { useEffect } from 'react'
import ManageTable from './manage-table'

const Manage = () => {
  const orderList = useAppSelector(selectOrderList)
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Object.keys(orderList).length === 0) {
      dispatch(getAllOrdersAsync())
    }
  }, [orderList])

  return <div className="container mx-auto">
    <ManageTable />
  </div>
}

const TableHeader= () => {
  return (
    <>
      <div className="col-span-1">Loại bảo hiểm</div>
      <div className="col-span-1">Tên chủ xe</div>
      <div className="col-span-1">Địa chỉ</div>
      <div className="col-span-1">Biển kiểm soát</div>
      <div className="col-span-1">Ngày bắt đầu</div>
      <div className="col-span-1">Ngầy kết thúc</div>
      <div className="col-span-1">Số máy</div>
      <div className="col-span-1">Số khung</div>
      <div className="col-span-1">Trạng thái</div>
      <div className="col-span-1">Action</div>
    </>
  )
}

export default Manage
