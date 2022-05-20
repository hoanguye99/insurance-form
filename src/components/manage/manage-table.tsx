import { useAppSelector } from 'app/hooks'
import AdminActionButton from 'components/common/admin-action-button'
import { selectOrderList } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/manage'
import React from 'react'
import styles from 'styles/component/manage/table.module.scss'
type Props = {}

const ManageTable = (props: Props) => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse
  return (
    orderList.ins && (
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
            <th>
              <span className="text-muted ">Số máy</span>
            </th>
            <th>
              <span className="text-muted ">Số khung</span>
            </th>
            <th>
              <span className="text-muted ">Trạng thái</span>
            </th>
            <th>
              <span className="text-muted "></span>
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
  )
}

interface RowDataProps extends InsuranceOrder {}

const RowData = (props: RowDataProps) => {
  let showStatus
  switch (props.status) {
    case OrderStatus.APPROVED:
      showStatus = (
        <div className="w-fit mx-auto font-bolder p-1.5 rounded-lg text-green-500 bg-green-200">
          Duyệt
        </div>
      )
      break
    case OrderStatus.PENDING:
      showStatus = (
        <div className="w-fit mx-auto font-bolder p-1.5 rounded-lg text-yellow-500 bg-yellow-50">
          Pending
        </div>
      )
      break
    case OrderStatus.REJECTED:
      showStatus = (
        <div className="w-fit mx-auto font-bolder p-1.5 rounded-lg text-red-500 bg-red-50">
          Hủy
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
      <td className="">{props.address}</td>
      <td className="">{props.plate}</td>
      <td className="">{props.startDate}</td>
      <td className="">{props.endDate}</td>
      <td className="">{props.engineNo}</td>
      <td className="">{props.chassisNo}</td>
      <td className="">{showStatus}</td>
      <td className="text-right">
        <AdminActionButton {...props} />
      </td>
    </tr>
  )
}

export default ManageTable
