
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
