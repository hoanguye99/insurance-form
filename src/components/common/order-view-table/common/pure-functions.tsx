import PopUp from 'components/common/pop-up'
import { Button } from 'components/styled'
import Spinner from 'components/styled/spinner'
import { OrderStatus } from 'models/components/common'
import { Path, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import table_empty from 'utils/assets/images/table_empty.jpg'

export const ActionButton = () => {
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

interface OptionButtonProps {
  onClick: () => void
  children: React.ReactNode
  loading?: boolean
}

export const OptionButton = (props: OptionButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
      disabled={props.loading}
    >
      {props.children}
    </button>
  )
}

export const ApproveButton = (props: { onClick: () => void }) => {
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

export const RejectButton = (props: { onClick: () => void }) => {
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

export const TableSpinner = () => {
  return (
    <div className="p-5 mt-7">
      <Spinner></Spinner>
    </div>
  )
}

export const TableEmpty = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <img src={table_empty} className="w-96 rounded-full" alt="" />
      <p className="text-center font-thin text-xl mt-5 mb-1">
        Bạn hiện chưa có đơn hàng nào!
      </p>
      <p className="text-center font-thin text-xl">
        Nhấn vào
        <Link
          to="/submit/individual"
          className="text-blue-500 hover:text-blue-700 transition-all duration-75"
        >
          {' '}
          đây{' '}
        </Link>
        để tạo mới
      </p>
    </div>
  )
}

export const StatusSpan = (props: { status: OrderStatus }) => {
  switch (props.status) {
    case OrderStatus.APPROVED:
      return (
        <span className="w-fit font-bolder p-1.5 rounded-lg text-green-500 bg-green-200">
          Approved
        </span>
      )
    case OrderStatus.PENDING:
      return (
        <span className="w-fit font-bolder p-1.5 rounded-lg text-yellow-500 bg-yellow-50">
          Pending
        </span>
      )
    case OrderStatus.REJECTED:
      return (
        <span className="w-fit font-bolder p-1.5 rounded-lg text-red-500 bg-red-50">
          Rejected
        </span>
      )
  }
  return null
}

interface ItemSectionProps<T> {
  type?: string
  label: string
  register: UseFormRegister<T>
  formLabel: Path<T>
}

export function ItemSection<T>(props: ItemSectionProps<T>) {
  return (
    <div className="flex flex-col gap-0 w-full">
      <label className="uppercase text-gray-700 opacity-70 font-['Muli-ExtraBold'] text-xs">
        {props.label}
      </label>
      <input
        type={props.type}
        {...props.register(props.formLabel, { required: true })}
        className="h-[48px] block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  )
}

interface ActionButtonsProps {
  onExit: () => void
}
export const ActionButtons = (props: ActionButtonsProps) => {
  function handleBackButtonClick() {
    props.onExit()
  }

  return (
    <div className="mt-12 flex justify-between items-center">
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
      <Button>Sửa</Button>
    </div>
  )
}

export const EditFormHeader = () => {
  return (
    <div className="pt-1 pb-14 flex justify-center items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <div className="font-['Muli-ExtraBold'] font-thin text-2xl">
        Chỉnh sửa
      </div>
    </div>
  )
}

interface CartStatusPopupProps {
  showCartStatus: string | null
  setShowCartStatus: React.Dispatch<React.SetStateAction<string | null>>
}

export const CartStatusPopup = (props: CartStatusPopupProps) => {
  return (
    <PopUp onClickOutside={() => props.setShowCartStatus(null)}>
      <div className="z-20 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 bg-opacity-70 rounded max-w-md w-full">
        <div className="flex flex-col justify-center items-center gap-12 my-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white bg-green-500 rounded-full border-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-center text-white font-['Muli-ExtraBold'] font-light text-lg">
            {props.showCartStatus}
          </p>
        </div>
      </div>
    </PopUp>
  )
}
