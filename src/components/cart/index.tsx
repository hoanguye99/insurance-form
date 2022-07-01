import { useAppDispatch } from 'app/hooks'
import { ErrorModal } from 'components/submit/individual'
import { resetCartConfirm } from 'features/cart/cart-confirm-slice'
import { useEffect } from 'react'
import { useCartConfirmState } from './hook'
import PaymentPage from './payment-page'
import ReviewPage from './review-page'

const Cart = () => {
  const {
    cartConfirmResponse,
    posting,
    showErrorModal,
    closeErrorModal,
    failureDescription,
  } = useCartConfirmState()
  const dispatch = useAppDispatch()
  useEffect(() => {return () => {
    dispatch(resetCartConfirm())
  }}, []);
  return (
    <>
      {showErrorModal && (
        <ErrorModal
          failureDescription={failureDescription}
          closeErrorModal={closeErrorModal}
        ></ErrorModal>
      )}
      <div className="container mx-auto">
        <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
          Giỏ hàng
        </p>
        {cartConfirmResponse === undefined ? (
            <ReviewPage posting={posting}></ReviewPage>
          ) : (
            <PaymentPage
              cartConfirmResponse={cartConfirmResponse}
            ></PaymentPage>
          )}
      </div>
    </>
  )
}

export default Cart
