import { selectOrderList } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import styles from 'styles/components/common/order-view-table.module.scss'
import { TableEmpty } from '../common'
import { useAppSelector } from 'app/hooks'
import { CgArrowsExchangeAltV } from 'react-icons/cg'

import { Column, useSortBy, useTable } from 'react-table'
import React from 'react'
import StatusColumn from './status-column'

const MainTable = () => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  const columns = React.useMemo<readonly Column<InsuranceOrder>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
      },
      {
        Header: 'TÊN CHỦ XE',
        accessor: 'ownerName',
      },
      {
        Header: 'ĐỊA CHỈ',
        accessor: 'address',
      },
      {
        Header: 'BIỂN SỐ',
        accessor: 'plate',
      },
      {
        Header: 'BẮT ĐẦU',
        accessor: 'startDate',
        sortType: (rowA, rowB, columnId, desc) => {
          return rowB.values[columnId]
            .split('/')
            .reverse()
            .join('')
            .localeCompare(rowA.values[columnId].split('/').reverse().join(''))
        },
      },
      {
        Header: 'KẾT THÚC',
        accessor: 'endDate',
        sortType: (rowA, rowB, columnId, desc) => {
          return rowB.values[columnId]
            .split('/')
            .reverse()
            .join('')
            .localeCompare(rowA.values[columnId].split('/').reverse().join(''))
        },
      },
      {
        Header: 'TRẠNG THÁI',
        accessor: 'status',
        Cell: (props) => {
          return <StatusColumn {...props.row.original} />
        },
      },
    ],
    []
  )

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }
  const tableInstance = useTable(
    {
      columns,
      data: orderList.ins,
    },
    useSortBy
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table {...getTableProps()} className={styles['main-table']}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="bg-[#f9fbfd] uppercase font-extrabold"
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div className="flex items-center gap-2">
                  <span>{column.render('Header')}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      )
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="">
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MainTable
