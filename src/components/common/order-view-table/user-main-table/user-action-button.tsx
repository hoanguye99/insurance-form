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
import { ActionButton, DetailButton, EditButton } from '../common/pure-functions'
import OrderEditModal from '../user-group-table/order-edit-modal'

const UserActionButton = (props: InsuranceOrder) => {
  const [showPopUp, setShowPopUp] = useState<ShowPopUp>({
    status: 0,
    style: {},
  })
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
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
            setShowEditModal={setShowEditModal}
          />
        }
      />

      {showDetailModal && (
        <Portal>
            <PopUp onClickOutside={() => {}}>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
                <OrderDetailModal onExit={() => setShowDetailModal(false)} {...props}></OrderDetailModal>
              </div>
            </PopUp>
        </Portal>
      )}

      {showEditModal && (
        <Portal>
            <PopUp onClickOutside={() => {}}>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
                {/* <OrderDetailModal onExit={() => setShowEditModal(false)} {...props}></OrderDetailModal> */}
                <OrderEditModal onExit={() => setShowEditModal(false)} {...props}></OrderEditModal>
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
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp2 = (props: PopUp2Props) => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()

  function handleDetailButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
    props.setShowDetailModal(true)
  }

  function handleEditButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
    props.setShowEditModal(true)
  }

  let buttons
  switch (props.status) {
    case OrderStatus.APPROVED:
      buttons = (
        <>
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
        </>
      )
      break
    case OrderStatus.PENDING:
      buttons = (
        <>
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
          <EditButton onClick={handleEditButtonClick}></EditButton>
        </>
      )
      break
    case OrderStatus.REJECTED:
      buttons = (
        <>
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
        </>
      )
      break
  }
  return <div className="bg-white rounded shadow flex flex-col">{buttons}</div>
}

export default UserActionButton
