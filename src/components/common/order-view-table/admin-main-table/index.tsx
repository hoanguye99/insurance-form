import styles from 'styles/components/common/order-view-table.module.scss'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  useData,
  useOrdersColumns,
} from '../common/react-table-functions/common'
import React from 'react'
import { DefaultColumnFilter, GlobalFilter } from '../common/react-table-functions/search-functions'
import { Pagination } from '../common/react-table-functions/paging-functions'

const AdminMainTable = () => {
  const data = useData()
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
    // rows,
    page,
    prepareRow,

    // Search
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,

    // Paging
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Search
      initialState: { pageSize: 12 }, // Paging
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <>
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
                    {/* Column Filter UI */}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {page.map((row, i) => {
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

      {pageCount > 1 && (
        <Pagination
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
        ></Pagination>
      )}
    </>
  )
}


export default AdminMainTable
