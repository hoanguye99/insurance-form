import { Button } from 'components/styled'
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
    <div className="container mx-auto">
      <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
        Đơn hàng
      </p>
      <svg
        className="w-20 h-20 text-gray-200 animate-spin fill-blue-500 mx-auto"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
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
        <Link to="/submit/individual" className="text-blue-500 hover:text-blue-700 transition-all duration-75"> đây </Link>
        để tạo mới
      </p>
    </div>
  )
}

export const StatusSpan = (props: {status: OrderStatus}) => {
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