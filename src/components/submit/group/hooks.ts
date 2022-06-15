import { useAppDispatch, useAppSelector } from "app/hooks"
import { resetOrderGroupCreate, selectFailureDescription, selectOrderGroupCreateResponse, selectStatus } from "features/order/order-group-create-slice"
import { useEffect, useState } from "react"


export const useOrderGroupCreateState = () => {
  const createGroupStatus = useAppSelector(selectStatus)
  const failureDescription = useAppSelector(selectFailureDescription)
  const orderGroupCreateResponse = useAppSelector(selectOrderGroupCreateResponse)
  const dispatch = useAppDispatch()
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    if (failureDescription !== "") {
      setShowErrorModal(true)
    }
  }, [failureDescription])

  function closeErrorModal() {
    dispatch(resetOrderGroupCreate())
    setShowErrorModal(false)
  }

  return {
    // showDetailModal,
    // closeDetailModal,
    orderGroupCreateResponse,
    posting: createGroupStatus === 'loading',
    showErrorModal,
    closeErrorModal,
    failureDescription,
  }
}
