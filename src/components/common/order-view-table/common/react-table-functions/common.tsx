import { useAppSelector } from 'app/hooks'
import { selectOrderList } from 'features/order/order-list-slice'
import { CreateOrderFormData, GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import React from 'react'
import { Column } from 'react-table'
import ChassisColumn from './chassis-column'
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

export const useUserOrdersColumns = () => {
  const columns = React.useMemo<readonly Column<InsuranceOrder>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
        Cell: (props) => {
          
          return <div>
            <p>{props.row.original.typeCode}</p>
          </div>
        },
      },
      {
        Header: 'TÊN CHỦ XE',
        accessor: 'ownerName',
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

export const useAdminOrdersColumns = () => {
  const columns = React.useMemo<readonly Column<InsuranceOrder>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
        Filter: TypeCodeColumnFilter,
        filter: 'includes',
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

export const useGroupOrdersColumns = () => {
  const columns = React.useMemo<readonly Column<CreateOrderFormData>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
        Filter: TypeCodeColumnFilter,
        filter: 'includes',
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
        Header: 'SỐ MÁY',
        accessor: 'engineNo',
      },
      {
        Header: 'SỐ KHUNG',
        accessor: 'chassisNo',
        Cell: (props) => {
          return <ChassisColumn {...props.row.original} />
        },
      },
    ],
    []
  )

  return columns
}

export const useReviewColumns = () => {
  const columns = React.useMemo<readonly Column<CreateOrderFormData>[]>(
    () => [
      {
        Header: 'LOẠI BẢO HIỂM',
        accessor: 'typeCode',
        Filter: TypeCodeColumnFilter,
        filter: 'includes',
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
        Header: 'SỐ MÁY',
        accessor: 'engineNo',
      },
      {
        Header: 'SỐ KHUNG',
        accessor: 'chassisNo',
      },
    ],
    []
  )

  return columns
}

export const useData = () => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  const data = React.useMemo(() => orderList.ins, [])

  return data
}

export function getPageRange(
  currentPage: number,
  pageLength: number,
  pageNum = 3
) {
  if (currentPage < 1) throw Error('The current Page cannot be less than 1')
  if (currentPage > pageLength)
    throw Error('The current Page exceeded the total page length')

  const minRange = Math.floor((currentPage - 1) / pageNum) * pageNum + 1
  const maxRange = Math.min(
    Math.ceil(currentPage / pageNum) * pageNum,
    pageLength
  )
  return [...Array(maxRange - minRange + 1)].map((x, index) => minRange + index)
}

interface PageButtonProps {
  active: boolean
  children: number
  onClick: () => void
}

export const PageButton = (props: PageButtonProps) => {
  return (
    <button
      className={
        props.active
          ? ' bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
          : 'bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border border-l-0 text-sm font-medium'
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

interface ControlButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
}

export const ControlButton = (props: ControlButtonProps) => {
  return (
    <button
      className={`${props.disabled ? "hidden" : ""} relative inline-flex items-center px-2 py-2 border border-l-0 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
