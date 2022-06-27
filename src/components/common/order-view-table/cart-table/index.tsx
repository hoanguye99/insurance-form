import styles from 'styles/components/common/order-view-table.module.scss'
import {
  useTable,
} from 'react-table'
import {
  useCartColumns,
  useCartData,
} from '../common/react-table-functions/common'
import React from 'react'

const CartTable = () => {
  const ret = useCartData()
  const data = React.useMemo(() => ret, [ret])
  const columns = useCartColumns()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
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
                  <th {...column.getHeaderProps()}>
                    <div className="flex items-center select-none">
                      <span>{column.render('Header')}</span>
                    </div>
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
    </>
  )
}

export default CartTable