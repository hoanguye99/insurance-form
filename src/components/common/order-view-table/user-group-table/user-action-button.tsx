import Portal from 'components/common/portal'
import { CreateOrderFormData, InsuranceOrder } from 'models/api'
import { ShowPopUp } from 'models/components/common'
import React, { useState } from 'react'
import PopUpButton from '../../pop-up-button'
import PopUp from 'components/common/pop-up'
import {
  ActionButton,
  DeleteButton,
  EditButton,
} from '../common/pure-functions'
import OrderEditModal from './order-edit-modal'
import { useAppDispatch } from 'app/hooks'
import { deleteOrderGroup } from 'features/order/order-group-slice'

const UserActionButton = (props: CreateOrderFormData) => {
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
          <PopUp onClickOutside={() => {}}>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-lg w-full">
              <OrderEditModal
                onExit={() => setShowDetailModal(false)}
                {...props}
              ></OrderEditModal>
            </div>
          </PopUp>
        </Portal>
      )}
    </>
  )
}

interface PopUp2Props extends CreateOrderFormData {
  setShowPopUp: React.Dispatch<React.SetStateAction<ShowPopUp>>
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp2 = (props: PopUp2Props) => {
  const dispatch = useAppDispatch()

  function handleEditButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
    props.setShowDetailModal(true)
  }

  function handleDeleteButtonClick() {
    props.setShowPopUp({ status: 0, style: {} })
    dispatch(deleteOrderGroup(props.plate))
  }

  return (
    <div className="bg-white rounded shadow flex flex-col">
      <EditButton onClick={handleEditButtonClick}></EditButton>
      <DeleteButton onClick={handleDeleteButtonClick}></DeleteButton>

    </div>
  )
}

export default UserActionButton
