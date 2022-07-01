import { useAppSelector } from 'app/hooks'
import {
  CartItem,
  useCartData,
} from 'components/common/order-view-table/common/react-table-functions/common'
import { selectProductList } from 'features/product/product-list-slice'

type OrderSummaryProps = {}

const OrderSummary = (props: OrderSummaryProps) => {
  const data = useCartData()
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return (
    <div className="shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 bg-white sm:p-6">
        <p className="font-['Muli-ExtraBold'] text-gray-900 mb-6">Đơn hàng</p>
        <div>
          {data.map((item) => (
            <Order key={item.id} {...item}></Order>
          ))}
        </div>

        <div className="mt-8 flex justify-end items-center gap-3">
          <p className="text-sm">Tổng thanh toán:</p>
          <span className="font-extrabold text-blue-400 text-lg">
            {formatter.format(
              data.reduce((sum, item) => sum + Number(item.amount), 0)
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

interface OrderProps extends CartItem {}

const Order = (props: OrderProps) => {
  const productList = useAppSelector(selectProductList)
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  let image

  if ('insTypes' in productList) {
    const index = productList.insTypes.findIndex(
      (prod) => prod.name === props.typeCode
    )
    image = (
      <img
        className="w-20 h-14"
        src={`${productList.insTypes[index].image}`}
        alt={`${props.typeCode} image`}
      />
    )
  } else {
    image = <></>
  }

  return (
    <div className="p-4 sm:p-5 border-x border-b first:border-t">
      <div className="flex flex-row gap-3">
        {image}
        <div className="flex flex-col justify-between text-sm text-gray-500">
          <p>Bảo hiểm {props.typeCode}</p>
          <p>Thời hạn: {props.duration} ngày</p>
        </div>
        <div className="ml-auto flex flex-col justify-center text-sm font-extrabold">
          {formatter.format(Number(props.amount))}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
