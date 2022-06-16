import { useAppDispatch, useAppSelector } from "app/hooks"
import { useState } from "react"

type UploadFormProps = {}

const UploadForm = (props: UploadFormProps) => {

  // const imageUploadStatus = useAppSelector(selectStatus)
  // const imageUploadResponse = useAppSelector(selectImageUploadResponse)

  // imageUploadResponse === undefined => <></>
  // imageUploadStatus === loading => Spinner
  // imageUploadResponse === {} => STM

  const dispatch = useAppDispatch()

  function showFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      if (e.target) {
        const text = e.target.result
        console.log(text);
        // dispatch(createOrderGroup(data))
      }
    }
    if (e && e.target && e.target.files) {
      reader.readAsText(e.target.files[0])
    }
  }


  return (
    <div>

      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="file_input"
        >
          Tải ảnh giấy đăng kí xe
        </label>
        <input
          className="block w-full text-sm px-3 py-1.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={(e) => showFile(e)}
          accept=".jpg,.png"
        />
      </div>

    </div>
  )
}

export default UploadForm
