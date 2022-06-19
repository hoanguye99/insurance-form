import orderApi from 'api/order-api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Button } from 'components/styled'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { selectOrderCreateResponse } from 'features/order/order-create-slice'
import { getAllOrdersAsync } from 'features/order/order-list-slice'
import { InsuranceOrder } from 'models/api'
import { OrderStatus } from 'models/components/common'
import { useNavigate } from 'react-router-dom'

interface OrderDetailModalProps extends InsuranceOrder {
  onExit: () => void
}

const OrderDetailModal = (props: OrderDetailModalProps) => {
  return (
    <div className="p-6 flex flex-col">
      <div className="pt-4 pb-10 flex flex-col items-center">
        <Status status={props.status}></Status>
        <div className="font-['Muli-ExtraBold'] font-thin text-2xl">
          Bảo hiểm {props.typeCode}
        </div>
        <div className="text-xl">{props.plate}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <ItemSection
            label="Account Mail"
            value={props.userName}
          ></ItemSection>
          <ItemSection label="Chủ xe" value={props.ownerName}></ItemSection>
          <ItemSection label="Địa chỉ" value={props.address}></ItemSection>
          <ItemSection label="Tổng tiền" value="25.000đ"></ItemSection>
        </div>
        <div className="flex flex-col gap-3 items-end text-right">
          <ItemSection
            label="Ngày bắt đầu CNBH"
            value={props.startDate}
          ></ItemSection>
          <ItemSection
            label="Ngày kết thúc CNBH"
            value={props.endDate}
          ></ItemSection>
          <ItemSection label="Số khung" value={props.chassisNo}></ItemSection>
          <ItemSection label="Số máy" value={props.engineNo}></ItemSection>
        </div>
      </div>
      <ActionButtons {...props}></ActionButtons>
    </div>
  )
}

interface ItemSectionProps {
  label: string
  value: string | number
}

const ItemSection = (props: ItemSectionProps) => {
  return (
    <div className="flex flex-col gap-0">
      <label className="uppercase text-gray-400 opacity-70 font-['Muli-ExtraBold'] text-xs">
        {props.label}
      </label>
      <div className="font-extrabold">{props.value}</div>
    </div>
  )
}

interface StatusProps {
  status: number
}

const Status = (props: StatusProps) => {
  switch (props.status) {
    case OrderStatus.APPROVED:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-green-500 bg-green-200">
          Approved
        </div>
      )
    case OrderStatus.PENDING:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-yellow-500 bg-yellow-50">
          Pending
        </div>
      )
    case OrderStatus.REJECTED:
      return (
        <div className="w-fit mx-auto font-['Muli-ExtraBold'] p-3 text-xl rounded mb-4 text-red-500 bg-red-50">
          Rejected
        </div>
      )
  }
  return <></>
}

interface ActionButtonsProps extends OrderDetailModalProps {}
const ActionButtons = (props: ActionButtonsProps) => {
  const userDetail = useAppSelector(selectUserDetail)
  const orderCreateResponse = useAppSelector(selectOrderCreateResponse)
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  async function handleApproveButtonClick() {
    try {
      props.onExit()
      const data = await orderApi.approveInsuranceOrder(props.id, userDetail)
      console.log(data)
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRejectButtonClick() {
    try {
      props.onExit()
      const data = await orderApi.rejectInsuranceOrder(props.id, userDetail)
      console.log(data)
      dispatch(getAllOrdersAsync())
    } catch (error) {
      console.log(error)
    }
  }

  function handleExitButtonClick() {
    props.onExit()
  }

  function handleBackButtonClick() {
    props.onExit()
    // navigate('/submit/individual')
  }

  function handleOrdersButtonClick() {
    props.onExit()
    navigate('/orders')
  }

  let buttons
  if (userDetail.role === 'ADMIN') {
    switch (props.status) {
      case OrderStatus.APPROVED:
        buttons = (
          <>
            <RejectButton onClick={handleRejectButtonClick}></RejectButton>
            <div></div>
          </>
        )
        break
      case OrderStatus.PENDING:
        buttons = (
          <>
            <RejectButton onClick={handleRejectButtonClick}></RejectButton>
            <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
          </>
        )
        break
      case OrderStatus.REJECTED:
        buttons = (
          <>
            <div></div>
            <ApproveButton onClick={handleApproveButtonClick}></ApproveButton>
          </>
        )
        break
    }
  } else if (userDetail.role === 'USER') {
    if (Object.keys(orderCreateResponse).length === 0) {
      buttons = (
        <>
          <div></div>
          <Button onClick={handleExitButtonClick}>Xong</Button>
        </>
      )
    } else {
      buttons = (
        <>
          <Button
            onClick={handleBackButtonClick}
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
          <Button onClick={handleOrdersButtonClick}>Đơn hàng</Button>
        </>
      )
    }
  }

  return (
    <div className="mt-12 flex justify-between items-center">{buttons}</div>
  )
}

const ApproveButton = (props: { onClick: () => void }) => {
  return (
    <Button
      onClick={props.onClick}
      className="bg-green-500 hover:bg-green-400 focus:bg-green-400 focus:ring-green-400"
    >
      Duyệt
    </Button>
  )
}

const RejectButton = (props: { onClick: () => void }) => {
  return (
    <Button
      onClick={props.onClick}
      className="bg-red-500 hover:bg-red-400 focus:bg-red-400 focus:ring-red-400"
    >
      Từ chối
    </Button>
  )
}

export default OrderDetailModal
