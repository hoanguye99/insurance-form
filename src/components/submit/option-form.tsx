import { Button, Input, Label } from 'components/styled'
import React from 'react'

const OptionForm = () => {
  return (
    <form action="#" method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <legend className="text-base font-medium text-gray-900">
            Loại hình bảo hiểm
          </legend>

          <div className="mt-4 flex flex-col">
            <OptionMotorbike />

            <OptionSmallCar />

            <OptionBigCar />
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button className="w-fit">Gửi</Button>
        </div>
      </div>
    </form>
  )
}

const OptionMotorbike = () => {
  return (
    <label
      htmlFor="motorbike"
      className="flex hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center h-5">
        <input
          id="motorbike"
          name="insurance-option"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <div className="font-medium text-gray-700">Xe máy</div>
        <p className="text-gray-500">
          Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên thứ
          ba:{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">30.000đ</span>
        </p>
        <p className="text-gray-500">
          Bảo hiểm tai nạn người ngồi trên xe (TNLP- không bắt buộc):{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">10.000đ</span>
        </p>
      </div>
    </label>
  )
}

const OptionSmallCar = () => {
  return (
    <label
      htmlFor="small-car"
      className="flex hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center h-5">
        <input
          id="small-car"
          name="insurance-option"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <div className="font-medium text-gray-700">Ô tô nhỏ hơn 6 chỗ </div>
        <p className="text-gray-500">
          Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên thứ
          ba:{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">370.000đ</span>
        </p>
        <p className="text-gray-500">
          Bảo hiểm tai nạn người ngồi trên xe (TNLP- không bắt buộc):{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">30.000đ</span>
        </p>
      </div>
    </label>
  )
}

const OptionBigCar = () => {
  return (
    <label
      htmlFor="big-car"
      className="flex hover:bg-gray-50 py-5 px-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center h-5">
        <input
          id="big-car"
          name="insurance-option"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
      <div className="font-medium text-gray-700">Ô tô từ 7 đến 11 chỗ </div>
        <p className="text-gray-500">
          Bảo hiểm bắt buộc (TNDS) đền bù trách nhiệm của chủ xe đối với bên thứ
          ba:{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">675.000đ</span>
        </p>
        <p className="text-gray-500">
          Bảo hiểm tai nạn người ngồi trên xe (TNLP- không bắt buộc):{' '}
          <span className="font-['Muli-ExtraBold'] text-gray-800">52.000đ</span>
        </p>
      </div>
    </label>
  )
}

export default OptionForm
