import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { selectOrderList, selectStatus } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/common'
import React from 'react'
import styles from 'styles/components/common/order-view-table.module.scss'
import AdminActionButton from './admin-action-button'
import { TableEmpty, TableSpinner } from './common'
import UserActionButton from './user-action-button'

const OrderViewTable = () => {
  const orderStatus = useAppSelector(selectStatus)

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
            <MainTable />
          </div>
        </div>
      )
    default:
      return <div>An error happened</div>
  }
}

const MainTable = () => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  return orderList.ins ? (
    orderList.ins.length === 0 ? (
      <TableEmpty />
    ) : (
      <table className={styles['main-table']}>
        <thead>
          <tr className="bg-[#f9fbfd] uppercase font-extrabold">
            {/* <th>
              <div className="custom-control custom-checkbox table-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="ordersSelect"
                  id="ordersSelectAll"
                />
                <label
                  className="custom-control-label"
                  htmlFor="ordersSelectAll"
                >
                  &nbsp;
                </label>
              </div>
            </th> */}
            <th>
              <span className="">Loại bảo hiểm</span>
            </th>
            <th>
              <span className="text-muted ">Tên chủ xe</span>
            </th>
            <th>
              <span className="text-muted ">Địa chỉ</span>
            </th>
            <th>
              <span className="text-muted ">Biển kiểm soát</span>
            </th>
            <th>
              <span className="text-muted ">Ngày bắt đầu</span>
            </th>
            <th>
              <span className="text-muted ">Ngầy kết thúc</span>
            </th>
            <th className="!pr-3">
              <span className="text-muted ">Trạng thái</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {orderList.ins.map((item) => (
            <RowData key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    )
  ) : (
    <></>
  )
}

interface RowDataProps extends InsuranceOrder {}

const RowData = (props: RowDataProps) => {
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

  let showStatus
  switch (props.status) {
    case OrderStatus.APPROVED:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-green-500 bg-green-200">
          Approved
        </div>
      )
      break
    case OrderStatus.PENDING:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-yellow-500 bg-yellow-50">
          Pending
        </div>
      )
      break
    case OrderStatus.REJECTED:
      showStatus = (
        <div className="w-fit font-bolder p-1.5 rounded-lg text-red-500 bg-red-50">
          Rejected
        </div>
      )
      break
  }

  return (
    <tr>
      {/* <td>
        <div className="">
          <input
            type="checkbox"
            className="custom-control-input"
            name="ordersSelect"
            id="ordersSelectOne"
          />
          <label className="custom-control-label" htmlFor="ordersSelectOne">
            &nbsp;
          </label>
        </div>
      </td> 
      0 da huy
      1 pending
      2 da duyet
      */}
      <td className="">{props.typeCode}</td>
      <td className="">{props.ownerName}</td>
      <td className={styles.address}>{props.address}</td>
      <td className="">{props.plate}</td>
      <td className="">{props.startDate}</td>
      <td className="">{props.endDate}</td>
      <td className="!pr-3">
        <div className="flex justify-between items-center">
          {showStatus}
          {actionButton}
        </div>
      </td>
    </tr>
  )
}

export default OrderViewTable
