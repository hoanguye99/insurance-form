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
import OrderDetailModal from './order-detail-modal'

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
          <div className="fixed inset-0 bg-black opacity-40 flex justify-center items-center animate-opacity ">
          </div>
            <PopUp onClickOutside={() => setShowDetailModal(false)}>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
                <OrderDetailModal onExit={() => setShowDetailModal(false)} {...props}></OrderDetailModal>
              </div>
            </PopUp>
        </Portal>
      )}

    </>
  )
}

const ActionButton = () => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500 hover:bg-gray-100 hover:text-gray-600 rounded-full p-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </button>
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
      console.log(data)
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRejectButtonClick() {
    try {
      props.setShowPopUp({ status: 0, style: {} })
      const data = await orderApi.rejectInsuranceOrder(props.id, userDetail)
      console.log(data)
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
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
          <RejectButton onClick={handleRejectButtonClick}></RejectButton>
        </>
      )
      break
    case OrderStatus.PENDING:
      buttons = (
        <>
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
          <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
          <RejectButton onClick={handleRejectButtonClick}></RejectButton>
        </>
      )
      break
    case OrderStatus.REJECTED:
      buttons = (
        <>
          <DetailButton onClick={handleDetailButtonClick}></DetailButton>
          <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
        </>
      )
      break
  }
  return <div className="bg-white rounded shadow flex flex-col">{buttons}</div>
}

const ApproveButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    >
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
      Duyệt
    </button>
  )
}

const RejectButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    >
      <div className="h-3 w-3 rounded-full bg-red-500"></div>
      Từ chối
    </button>
  )
}

const DetailButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    >
      {/* <div className="h-3 w-3 rounded-full bg-white hover:bg-gray-100"></div> */}
      Thông tin chi tiết
    </button>
  )
}

export default AdminActionButton
