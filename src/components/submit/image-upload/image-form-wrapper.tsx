import { useAppSelector } from 'app/hooks'
import Spinner from 'components/styled/spinner'
import {
  selectFailureDescription,
  selectImageUploadResponse,
  selectStatus,
} from 'features/image/image-upload-slice'
import ImageForm from './image-form'

const ImageFormWrapper = () => {
  const imageUploadStatus = useAppSelector(selectStatus)
  const imageUploadResponse = useAppSelector(selectImageUploadResponse)
  const imageFailureDescription = useAppSelector(selectFailureDescription)

  const imageLoading = imageUploadStatus === 'loading'
  const imageReady = imageUploadResponse !== undefined

  if (imageReady) {
    if ('errorMessage' in imageUploadResponse) {
      return <div className="">{imageUploadResponse.errorMessage}</div>
    } else {
      return <ImageForm data={imageUploadResponse}></ImageForm>
    }
  } else if (imageUploadStatus === 'failed') {
    return (
      <div>
        <p>Image Upload Backend Error!!!</p>
        <p>{imageFailureDescription}</p>
      </div>
    )
  } else if (imageLoading) {
    return <Spinner />
  } else {
    return <div>Upload a different picture</div>
  }
}

export default ImageFormWrapper
