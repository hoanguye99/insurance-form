import React from 'react'
import UploadForm from './upload-form'

type Props = {}

const ImageUpload = (props: Props) => {
  return (
    <div className="bg-[#f3f4f6]">
      <div className=" container mx-auto pb-10">
        <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
          Đăng kí theo ảnh
        </p>
        <UploadForm></UploadForm>
      </div>
    </div>
  )
}

export default ImageUpload
