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

export const DetailButton = (props: { onClick: () => void }) => {
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

export const EditButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 w-52 text-left p-3 text-base font-extrabold text-gray-500 hover:text-gray-800 hover:bg-gray-100"
    >
      {/* <div className="h-3 w-3 rounded-full bg-white hover:bg-gray-100"></div> */}
      Chỉnh sửa thông tin
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
