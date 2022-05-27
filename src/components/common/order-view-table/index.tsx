import { useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { selectOrderList, selectStatus } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/common'
import React from 'react'
import styles from 'styles/components/common/order-view-table.module.scss'
import AdminActionButton from './admin-action-button'
import UserActionButton from './user-action-button'

const OrderViewTable = () => {
  const orderStatus = useAppSelector(selectStatus)

  switch (orderStatus) {
    case 'loading':
      return (
        <div className="container mx-auto">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đơn hàng
          </p>
          <svg
            className="w-20 h-20 text-gray-200 animate-spin fill-blue-500 mx-auto"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )
    case 'idle':
      return (
        <div className="container mx-auto">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đơn hàng
          </p>
          <MainTable />
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
      <p className="text-center font-thin text-2xl">
        Bạn hiện chưa có đơn hàng nào!
      </p>
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
