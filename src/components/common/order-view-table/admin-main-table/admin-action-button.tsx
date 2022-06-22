import orderApi from 'api/order-api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Portal from 'components/common/portal'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { getAllOrdersAsync } from 'features/order/order-list-slice'
import { InsuranceOrder } from 'models/api'
import { ShowPopUp } from 'models/components/common'
import { OrderStatus } from 'models/components/common'
import React, { useState } from 'react'
import PopUpButton from '../../pop-up-button'
import PopUp from 'components/common/pop-up'
import OrderDetailModal from '../common/order-detail-modal'
import {
  ActionButton,
  OptionButton,
} from '../common/pure-functions'

const AdminActionButton = (props: InsuranceOrder) => {
  const [showPopUp, setShowPopUp] = useState<ShowPopUp>({
    status: 0,
    style: {},
  })
  const [showDetailModal, setShowDetailModal] = useState(false)
  return (
    <>
      <PopUpButton
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        button={<ActionButton />}
        popup={
          <PopUp2
            {...props}
            setShowPopUp={setShowPopUp}
            setShowDetailModal={setShowDetailModal}
          />
        }
      />

      {showDetailModal && (
        <Portal>
          <PopUp onClickOutside={() => setShowDetailModal(false)}>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
              <OrderDetailModal
                onExit={() => setShowDetailModal(false)}
                {...props}
              ></OrderDetailModal>
            </div>
          </PopUp>
        </Portal>
      )}
    </>
  )
}

interface PopUp2Props extends InsuranceOrder {
  setShowPopUp: React.Dispatch<React.SetStateAction<ShowPopUp>>
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp2 = (props: PopUp2Props) => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()
  async function handleApproveButtonClick() {
    try {
      props.setShowPopUp({ status: 0, style: {} })
      const data = await orderApi.approveInsuranceOrder(props.id, userDetail)
      // console.log(data)
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRejectButtonClick() {
    try {
      props.setShowPopUp({ status: 0, style: {} })
      const data = await orderApi.rejectInsuranceOrder(props.id, userDetail)
      // console.log(data)
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  function handleDetailButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
    props.setShowDetailModal(true)
  }

  let buttons
  switch (props.status) {
    case OrderStatus.APPROVED:
      buttons = (
        <>
          <OptionButton onClick={handleDetailButtonClick}>Thông tin xhi tiết</OptionButton>
          <OptionButton onClick={handleRejectButtonClick}>Hủy</OptionButton>
        </>
      )
      break
    case OrderStatus.PENDING:
      buttons = (
        <>
          <OptionButton onClick={handleDetailButtonClick}>Thông tin chi tiết</OptionButton>
          <OptionButton onClick={handleApproveButtonClick}>Duyệt</OptionButton>
          <OptionButton onClick={handleRejectButtonClick}>Hủy</OptionButton>
        </>
      )
      break
    case OrderStatus.REJECTED:
      buttons = (
        <>
          <OptionButton onClick={handleDetailButtonClick}>Thông tin chi tiết</OptionButton>
          <OptionButton onClick={handleApproveButtonClick}>Duyệt</OptionButton>
        </>
      )
      break
  }
  return <div className="bg-white rounded shadow flex flex-col">{buttons}</div>
}

export default AdminActionButton
