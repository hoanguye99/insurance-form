import { useSearchParams } from 'react-router-dom'
import payment_success from 'utils/assets/images/payment_success.jpg'

const Confirm = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white -mt-20 rounded-lg p-10">
        <p className="text-4xl font-['Muli-ExtraBold'] text-blue-500 mb-10">
          Thanh toán thành công
        </p>
        <img src={payment_success} className="w-96" alt="" />
        <p className="text-lg text-gray-500 mt-12">
          Mã thanh toán: {searchParams.get('transCode') || ""}
        </p>
      </div>
    </div>
  )
}

export default Confirm
