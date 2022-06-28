import { ConfirmCartResponse } from 'models/api'

interface PaymentPageProps {
  cartConfirmResponse: ConfirmCartResponse
}

const PaymentPage = (props: PaymentPageProps) => {
  return <div>{JSON.stringify(props.cartConfirmResponse)}</div>
}

export default PaymentPage
