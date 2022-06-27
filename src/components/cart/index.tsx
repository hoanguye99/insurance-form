import { useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import CartTable from 'components/common/order-view-table/cart-table'
import { TableEmpty } from 'components/common/order-view-table/common/pure-functions'
import { selectCart, selectCartStatus } from 'features/cart/cart-get-slice'

const Cart = () => {
  const cartStatus = useAppSelector(selectCartStatus)
  const cart = useAppSelector(selectCart)

  return (
    <div className="container mx-auto">
      <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
        Giỏ hàng
      </p>
      <div className="overflow-x-auto">
        <OrderViewTable
          loadingStatus={cartStatus}
          isTableEmpty={cart !== undefined && cart.details.length === 0}
          TableEmpty={<TableEmpty />}
        >
          <CartTable />
        </OrderViewTable>
      </div>
    </div>
  )
}

export default Cart
