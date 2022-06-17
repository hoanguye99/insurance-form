import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type UploadFormProps = {}

const UploadForm = (props: UploadFormProps) => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const imageLoaded = image !== undefined
  // const imageUploadStatus = useAppSelector(selectStatus)
  // const imageUploadResponse = useAppSelector(selectImageUploadResponse)

  // imageUploadStatus === loading => Spinner
  // imageUploadResponse === {} => STM

  const dispatch = useAppDispatch()

  function showFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e && e.target && e.target.files) {
      setImage(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:divide-x gap-3">
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
  )
}

export default UploadForm
