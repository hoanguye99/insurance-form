import { ImageUploadResponse } from 'models/api'
import { UserDetail } from 'models/features'
import imageUploadClient from './image-upload-client'

const imageUploadApi = {
  upload(file: File): Promise<ImageUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    const url = '/ins-upload/?detectPlate=1'
    return imageUploadClient.post(url, formData)
  },
}

export default imageUploadApi
