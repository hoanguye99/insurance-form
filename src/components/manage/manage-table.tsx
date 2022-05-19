import { useAppSelector } from 'app/hooks'
import { selectOrderList } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse } from 'models/api'
import React from 'react'
import styles from 'styles/component/manage/table.module.scss'
type Props = {}

const ManageTable = (props: Props) => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse
  return orderList.ins && (
      <table className={styles['main-table']}>
        <thead>
          <tr className="bg-[#f9fbfd] uppercase font-extrabold">
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
              <span className="text-muted ">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* <tr>
                      <td>
                        <div className="custom-control custom-checkbox table-checkbox">
                          <input type="checkbox" className="custom-control-input" name="ordersSelect" id="ordersSelectOne">
                          <label className="custom-control-label" for="ordersSelectOne">
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td className="orders-order">
                        #6520
                      </td>
                      <td className="orders-product">
                        5' x 3' Wall Poster
                      </td>
                      <td className="orders-date">
                        <time datetime="2018-07-30">07/30/18</time>
                      </td>
                      <td className="orders-total">
                        $55.25
                      </td>
                      <td className="orders-status">
                        <div className="badge badge-soft-success">
                          Shipped
                        </div>
                      </td>
                      <td className="orders-method">
                        Mastercard
                      </td>
                      <td className="text-right">
                        <div className="dropdown">
                          <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fe fe-more-vertical"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a href="#!" className="dropdown-item">
                              Action
                            </a>
                            <a href="#!" className="dropdown-item">
                              Another action
                            </a>
                            <a href="#!" className="dropdown-item">
                              Something else here
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr> */}
        </tbody>
      </table>
  )
}

export default ManageTable
