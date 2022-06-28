import { TableEmpty, TableSpinner } from './common/pure-functions'

interface OrderViewTableProps {
  children: React.ReactNode
  loadingStatus: 'loading' | 'idle' | 'failed' | 'init'
  isTableEmpty: boolean
  TableEmpty: React.ReactNode
  TableError?: React.ReactNode
}

const OrderViewTable = (props: OrderViewTableProps) => {
  switch (props.loadingStatus) {
    case 'init':
      return <></>
    case 'loading':
      return <TableSpinner />
    case 'idle':
      return props.isTableEmpty ? (
        <>{props.TableEmpty}</>
      ) : (
        <>{props.children}</>
      )
    default:
      return <>{props.TableError || <p>An error has occured</p>}</>
  }
}

export default OrderViewTable
