import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  resetOrderCreate,
  selectFailureDescription,
  selectOrderCreateResponse,
  selectStatus,
} from 'features/order/order-create-slice'
import { CreateOrderFormData } from 'models/api'
import { useEffect, useState } from 'react'
import { UseFormReset } from 'react-hook-form'

export const useCreateOrderState = (reset : UseFormReset<CreateOrderFormData>) => {
  const createStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const failureDescription = useAppSelector(selectFailureDescription)
  const orderCreateResponse = useAppSelector(selectOrderCreateResponse)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    if (Object.keys(orderCreateResponse).length != 0) {
      setShowDetailModal(true)
    }
  }, [orderCreateResponse])

  useEffect(() => {
    if (failureDescription !== "") {
      setShowErrorModal(true)
    }
  }, [failureDescription])

  function closeDetailModal() {
    dispatch(resetOrderCreate())
    setShowDetailModal(false)
    reset()
  }

  function closeErrorModal() {
    dispatch(resetOrderCreate())
    setShowErrorModal(false)
  }

  return {
    showDetailModal,
    closeDetailModal,
    orderCreateResponse,
    posting: createStatus === 'loading',
    showErrorModal,
    closeErrorModal,
    failureDescription,
  }
}
