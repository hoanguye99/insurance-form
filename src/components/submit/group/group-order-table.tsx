import { useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import UserGroupTable from 'components/common/order-view-table/user-group-table'
import { selectOrderGroup } from 'features/order/order-group-slice'
import table_empty from 'utils/assets/images/table_empty.jpg'

type Props = {}

const GroupOrderTable = (props: Props) => {
  const orderGroup = useAppSelector(selectOrderGroup)

  return (
    <div className="overflow-x-auto">
      <OrderViewTable
        loadingStatus="idle"
        isTableEmpty={orderGroup.length === 0}
        TableEmpty={<GroupTableEmpty />}
      >
        <UserGroupTable />
      </OrderViewTable>
    </div>
  )
}

const GroupTableEmpty = () => {
  return (
    <div className="w-full flex flex-col items-center mt-14 mb-5">
      <img src={table_empty} className="w-64 rounded-full" alt="" />
      <p className="text-center font-thin text-lg mt-5 mb-1">
        Trống trơn ... !
      </p>
      <p className="text-center font-thin text-lg">
        Hãy tải file CSV theo file mẫu cung cấp !
      </p>
    </div>
  )
}

export default GroupOrderTable
