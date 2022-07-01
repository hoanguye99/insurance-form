import { useAppDispatch, useAppSelector } from 'app/hooks'
import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { Button } from 'components/styled'
import { Section } from 'components/submit/common'
import { ErrorModal } from 'components/submit/individual'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { resetCartConfirm } from 'features/cart/cart-confirm-slice'
import { getCartAsync } from 'features/cart/cart-get-slice'
import { makeOneClickPaymentAsync } from 'features/payment/make-one-click-payment'
import { makePaymentAsync } from 'features/payment/make-payment-slice'
import { ConfirmCartResponse } from 'models/api'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMakeOneClickPaymentState, useMakePaymentState } from '../hook'
import OrderSummary from './order-summary'
import PaymentMethods from './payment-methods'

interface PaymentPageProps {
  cartConfirmResponse: ConfirmCartResponse
}

export interface PaymentMethodsFormData {
  paymentOption: string
}

const PaymentPage = (props: PaymentPageProps) => {
  const dispatch = useAppDispatch()
  const userDetail = useAppSelector(selectUserDetail)

  const {
    paymentSubmitted,
    paymentPosting,
    showPaymentErrorModal,
    closePaymentErrorModal,
    paymentFailureDescription,
  } = useMakePaymentState()

  const {
    onePaySubmitted,
    oneClickPosting,
    showOnePayErrorModal,
    closeOnePayErrorModal,
    onePayFailureDescription,
  } = useMakeOneClickPaymentState()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentMethodsFormData>()

  const [domesticBank, setDomesticbank] = useState('')
  const watchPaymentOption = watch('paymentOption', '')
  const handleFormSubmit: SubmitHandler<PaymentMethodsFormData> = async (
    formSubmit
  ) => {
    if (formSubmit.paymentOption.startsWith('INS-')) {
      dispatch(
        makeOneClickPaymentAsync({
          amount: props.cartConfirmResponse.amount,
          cardUid: formSubmit.paymentOption,
          userId: Number(userDetail.id),
          invoiceId: Number(props.cartConfirmResponse.invoiceId),
          invoiceCode: props.cartConfirmResponse.invoiceCode,
        })
      )
    } else {
      if (formSubmit.paymentOption === 'DOMESTIC') {
        dispatch(
          makePaymentAsync({
            amount: props.cartConfirmResponse.amount,
            bankCode: domesticBank,
            paymentMethod: formSubmit.paymentOption,
            userId: Number(userDetail.id),
            invoiceId: Number(props.cartConfirmResponse.invoiceId),
            invoiceCode: props.cartConfirmResponse.invoiceCode,
          })
        )
      } else {
        dispatch(
          makePaymentAsync({
            amount: props.cartConfirmResponse.amount,
            paymentMethod: formSubmit.paymentOption,
            userId: Number(userDetail.id),
            invoiceId: Number(props.cartConfirmResponse.invoiceId),
            invoiceCode: props.cartConfirmResponse.invoiceCode,
          })
        )
      }
    }
  }

  return (
    <>      
      {showPaymentErrorModal && (
        <ErrorModal
          failureDescription={paymentFailureDescription}
          closeErrorModal={closePaymentErrorModal}
        ></ErrorModal>
      )}

      {showOnePayErrorModal && (
        <ErrorModal
          failureDescription={onePayFailureDescription}
          closeErrorModal={closeOnePayErrorModal}
        ></ErrorModal>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Section className="pt-0 mb-6">
          <OrderSummary></OrderSummary>
        </Section>
        <Section className="pt-0 mb-4">
          <PaymentMethods
            domesticBank={domesticBank}
            setDomesticbank={setDomesticbank}
            watchPaymentOption={watchPaymentOption}
            register={register}
          ></PaymentMethods>
        </Section>

        <Section>
          <div className="flex justify-between items-center sm:pt-7 mb-12">
            <Button
              onClick={() => {
                dispatch(resetCartConfirm())
                dispatch(getCartAsync())
              }}
              className="w-fit bg-gray-600 hover:bg-gray-500 focus:bg-gray-400 focus:ring-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </Button>
            <Button
              className={`w-fit ${
                watchPaymentOption === 'DOMESTIC' && domesticBank === ''
                  ? '!cursor-not-allowed'
                  : ''
              }`}
              posting={paymentPosting || oneClickPosting || onePaySubmitted || paymentSubmitted}
              disabled={paymentPosting || oneClickPosting || (watchPaymentOption === 'DOMESTIC' && domesticBank === '') || onePaySubmitted || paymentSubmitted}
            >
              Đặt hàng
            </Button>
          </div>
        </Section>
      </form>
    </>
  )
}

export default PaymentPage
