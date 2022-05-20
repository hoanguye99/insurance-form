import orderApi from 'api/order-api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { getAllOrdersAsync } from 'features/order/order-list-slice'
import { InsuranceOrder } from 'models/api'
import { ShowPopUp } from 'models/components/common'
import { OrderStatus } from 'models/components/manage'
import React, { useState } from 'react'
import PopUpButton from '../pop-up-button'


const AdminActionButton = (props: InsuranceOrder) => {
  const [showPopUp, setShowPopUp] = useState<ShowPopUp>({
      status: 0,
      style: {},
    })
  return <PopUpButton showPopUp={showPopUp} setShowPopUp={setShowPopUp} button={<ActionButton />} popup={<PopUp {...props} setShowPopUp={setShowPopUp} />} />
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

interface PopUpProps extends InsuranceOrder {
  setShowPopUp: React.Dispatch<React.SetStateAction<ShowPopUp>>
}

const PopUp = (props: PopUpProps) => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()
  async function handleApproveButtonClick () {
    try {
      props.setShowPopUp({status: 0, style: {}})
      const data = await orderApi.approveInsuranceOrder(props.id, userDetail)
      console.log(data);
      dispatch(getAllOrdersAsync())
    } catch(error) {
      console.log(error);
    }
  }

  async function handleRejectButtonClick () {
    try{
      props.setShowPopUp({status: 0, style: {}})
      const data = await orderApi.rejectInsuranceOrder(props.id, userDetail)
      console.log(data);
      dispatch(getAllOrdersAsync())
    } catch(error) {
      console.log(error);
    }
  }

  let buttons
  switch (props.status) {
    case OrderStatus.APPROVED:
      buttons = (
        <>
          <RejectButton onClick={handleRejectButtonClick}></RejectButton>
          <ContactButton></ContactButton>
        </>
      )
      break
    case OrderStatus.PENDING:
      buttons = (
        <>
          <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
          <RejectButton onClick={handleRejectButtonClick}></RejectButton>
          <ContactButton></ContactButton>
        </>
      )
      break
    case OrderStatus.REJECTED:
      buttons = (
        <>
          <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
          <ContactButton></ContactButton>
        </>
      )
      break
  }
  return <div className="bg-white rounded shadow flex flex-col">
    {buttons}
  </div>
}

const ApproveButton = (props: {onClick: () => void}) => {
  return (
    <button onClick={props.onClick} className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100">
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
      Duyệt
    </button>
  )
}

const RejectButton = (props: {onClick: () => void}) => {
  return (
    <button onClick={props.onClick} className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100">
      <div className="h-3 w-3 rounded-full bg-red-500"></div>
      Từ chối
    </button>
  )
}

const ContactButton = () => {
  return (
    <button className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100">
      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
      Liên hệ nhân viên
    </button>
  )
}

export default AdminActionButton
