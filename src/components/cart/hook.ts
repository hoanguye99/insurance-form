import { useAppDispatch, useAppSelector } from "app/hooks"
import { resetCartConfirm, selectCartConfirmResponse, selectFailureDescription, selectStatus } from "features/cart/cart-confirm-slice"
import { useEffect, useState } from "react"

export const useCartConfirmState = () => {
  const cartConfirmStatus = useAppSelector(selectStatus)
  const failureDescription = useAppSelector(selectFailureDescription)
  const cartConfirmResponse = useAppSelector(selectCartConfirmResponse)
  const dispatch = useAppDispatch()
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    if (failureDescription !== "") {
      setShowErrorModal(true)
    }
  }, [failureDescription])

  function closeErrorModal() {
    dispatch(resetCartConfirm())
    setShowErrorModal(false)
  }

  return {
    // showDetailModal,
    // closeDetailModal,
    cartConfirmResponse,
    posting: cartConfirmStatus === 'loading',
    showErrorModal,
    closeErrorModal,
    failureDescription,
  }
}
