import payment_success from 'utils/assets/images/payment_success.jpg'

const Confirm = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">

        <p className="text-4xl font-['Muli-ExtraBold'] text-blue-500 -mt-40 mb-10">Thanh toán thành công</p>
        <img src={payment_success} className="w-96" alt="" />
        <p className="text-lg text-gray-500 mt-12">Mã thanh toán: PAY-R2EYLd6KTTGf8s8vVp47_g</p>
    </div>
  )
}

export default Confirm