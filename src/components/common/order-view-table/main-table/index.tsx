import { selectOrderList } from 'features/order/order-list-slice'
import { GetAllInsuranceOrdersResponse, InsuranceOrder } from 'models/api'
import styles from 'styles/components/common/order-view-table.module.scss'
import { useAppSelector } from 'app/hooks'
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, useOrdersColumns } from './common'
import React from 'react'
import { DefaultColumnFilter, GlobalFilter } from './search-functions'

const MainTable = () => {
  const orderList = useAppSelector(
    selectOrderList
  ) as GetAllInsuranceOrdersResponse

  const columns = useOrdersColumns()

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: orderList.ins,
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  return (
    <table {...getTableProps()} className={styles['main-table']}>
      <thead>
        <tr>
          <th colSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
        {headerGroups.map((headerGroup) => (
          <>
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-[#f9fbfd] uppercase font-extrabold"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex items-center gap-2 select-none">
                    <span>{column.render('Header')}</span>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDown />
                        ) : (
                          <ArrowUp />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              {headerGroup.headers.map((column) => (
                <th className="!p-2">
                  {/* COlumn Filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          </>
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
