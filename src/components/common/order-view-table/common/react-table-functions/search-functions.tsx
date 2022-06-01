import { OrderStatus } from 'models/components/common'
import React from 'react'
import { useAsyncDebounce } from 'react-table'
import { StatusSpan } from '../pure-functions'

interface GlobalFilterType {
  preGlobalFilteredRows: any[]
  globalFilter: string
  setGlobalFilter: (param: string | undefined) => void
}
// Define a default UI for filtering
export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: GlobalFilterType) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="flex items-center pl-1.5">
      <svg
        className="w-6 h-6 text-gray-700 peer-focus:hidden"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        type="text"
        className="block w-full py-1 ml-3 text-gray-700 text-sm placeholder-gray-700 bg-transparent placeholder-opacity-30 focus:outline-none focus:placeholder-opacity-0"
        placeholder={`Tìm thấy ${count} đơn. Nhập vào đây để tìm kiếm toàn bộ ...`}
      />
    </span>
  )
}

interface DefaultColumnFilterType {
  column: {
    filterValue: string
    preFilteredRows: any[]
    setFilter: (param: string) => void
  }
}

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: DefaultColumnFilterType) {
  return (
    <span className="flex items-center pl-1.5">
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value) // Set undefined to remove the filter entirely
        }}
        type="text"
        className="peer order-2 block w-full border-b border-transparent focus:border-gray-400 py-1 ml-3 focus:mr-3 focus:-translate-x-3 text-gray-700 text-xs placeholder-gray-600 bg-transparent placeholder-opacity-30 focus:outline-none focus:placeholder-opacity-0"
        placeholder="Search"
      />
      <svg
        className="order-1 w-3 h-3 text-gray-700 peer-focus:hidden"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </span>
  )
}

interface StatusColumnFilterType {
  column: {
    filterValue: any
    setFilter: (param: any) => void
  }
}

// This is a custom filter UI for selecting
// a unique option from a list
export function StatusColumnFilter({
  column: { filterValue, setFilter },
}: StatusColumnFilterType) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(
    () => Object.keys(OrderStatus).filter((v) => !isNaN(Number(v))),
    []
  )
  // Render a multi-select box
  return (
    <select
      className="block w-full bg-transparent focus:outline-none"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value)
      }}
    >
      <option value="">All</option>
      {options.length !== 0 &&
        options.map((option, i) => (
          <option key={i} value={option}>
            <StatusSpan status={Number(option)} />
          </option>
        ))}
    </select>
  )
}

interface TypeCodeColumnFilterType {
  column: {
    filterValue: any
    setFilter: (param: any) => void
    preFilteredRows: any[]
    id: string
  }
}

// This is a custom filter UI for selecting
// a unique option from a list
export function TypeCodeColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: TypeCodeColumnFilterType) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set<any>()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      className="block w-full bg-transparent focus:outline-none"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
