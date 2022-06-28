import { useAppDispatch, useAppSelector } from 'app/hooks'
import OrderViewTable from 'components/common/order-view-table'
import CartTable from 'components/common/order-view-table/cart-table'
import { TableEmpty } from 'components/common/order-view-table/common/pure-functions'
import { Button } from 'components/styled'
import {
  confirmCartAsync,
  selectStatus,
} from 'features/cart/cart-confirm-slice'
import {
  getCartAsync,
  selectCart,
  selectCartStatus,
} from 'features/cart/cart-get-slice'

interface ReviewPageProps {
  posting: boolean
}

const ReviewPage = (props: ReviewPageProps) => {
  const dispatch = useAppDispatch()
  const cartStatus = useAppSelector(selectCartStatus)
  const cart = useAppSelector(selectCart)
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return (
    <>
      <div className="overflow-x-auto">
        <OrderViewTable
          loadingStatus={cartStatus}
          isTableEmpty={cart !== undefined && cart.details.length === 0}
          TableEmpty={<TableEmpty />}
          TableError={<TableEmpty />}
        >
          <CartTable />
        </OrderViewTable>
      </div>
      {cart !== undefined && (
        <div className="mt-8 flex justify-end items-center gap-3">
          <p className="text-sm">Tổng thanh toán:</p>
          <span className="font-extrabold text-blue-400 text-lg">
            {formatter.format(
              cart.details.reduce((sum, item) => sum + Number(item.amount), 0)
            )}
          </span>
          <Button
            onClick={() => {
              dispatch(confirmCartAsync(cart.orderId))
            }}
            className="w-fit"
            posting={props.posting}
          >
            Thanh toán
          </Button>
        </div>
      )}
    </>
  )
}

export default ReviewPage
