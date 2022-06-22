import { CreateOrderFormData } from 'models/api'
import React from 'react'
import {
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import styles from 'styles/components/common/order-view-table.module.scss'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown, useReviewColumns
} from '../common/react-table-functions/common'
import { Pagination } from '../common/react-table-functions/paging-functions'

interface ReviewTableProps {
  data: CreateOrderFormData[]
}

const ReviewTable = (props: ReviewTableProps) => {
  const data = React.useMemo(() => props.data, [])

  const columns = useReviewColumns()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    prepareRow,

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
      initialState: { pageSize: 13 }, // Paging
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <table {...getTableProps()} className={styles['main-table']}>
        <thead>
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


export default ReviewTable
