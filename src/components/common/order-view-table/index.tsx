import { TableEmpty, TableSpinner } from './common/pure-functions'

interface OrderViewTableProps {
  children: React.ReactNode
  loadingStatus: 'loading' | 'idle' | 'failed' | 'init'
  isTableEmpty: boolean
  TableEmpty: React.ReactNode
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
      return <div>An error happened</div>
  }
}

export default OrderViewTable
