import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectImageUploadResponse,
  selectStatus,
  uploadImageAsync,
} from 'features/image/image-upload-slice'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ImageFormWrapper from './image-form-wrapper'

type UploadFormProps = {}

const UploadForm = (props: UploadFormProps) => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const imageLoaded = image !== undefined

  const dispatch = useAppDispatch()

  function showFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e && e.target && e.target.files) {
      setImage(e.target.files[0])
      dispatch(uploadImageAsync(e.target.files[0]))
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center sm:divide-x gap-3 mb-14">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Tải ảnh giấy đăng kí xe
          </label>
          <input
            className="block text-sm px-3 py-1.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => showFile(e)}
            accept=".jpg,.png"
          />
        </div>

        {imageLoaded ? (
          <Zoom>
            <img
              className="pl-3 sm:max-h-32 sm:max-w-fit"
              src={URL.createObjectURL(image)}
              alt=""
            />
          </Zoom>
        ) : (
          <></>
        )}
      </div>

      {imageLoaded ? <ImageFormWrapper /> : <UploadPrompt />}
    </div>
  )
}

const UploadPrompt = () => {
  return (
    <div className="w-full flex flex-col items-center mb-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-center font-thin text-lg mt-5 mb-1">
        Hãy tải ảnh giấy đăng kí xe của bạn !
      </p>
    </div>
  )
}

export default UploadForm
