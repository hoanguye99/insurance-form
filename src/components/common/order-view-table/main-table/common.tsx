import { InsuranceOrder } from 'models/api'
import React from 'react'
import { Column } from 'react-table'
import { StatusColumnFilter, TypeCodeColumnFilter } from './search-functions'
import StatusColumn from './status-column'

export const ArrowDown = () => {
  return (
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
  )
}

export const ArrowUp = () => {
  return (
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
}

export const ArrowUpDown = () => {
  return (
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
  )
}

export const useOrdersColumns = () => {
  const columns = React.useMemo<readonly Column<InsuranceOrder>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
        Filter: TypeCodeColumnFilter,
        filter: 'includes'
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
        sortType: (rowA, rowB, columnId) => {
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
        Filter: StatusColumnFilter,
        filter: (rows, columnIds, filterValue) =>
          rows.filter((row) => {
            return filterValue === ''
              ? true
              : String(row.values['status']) === filterValue
          }),
      },
    ],
    []
  )

  return columns
}
