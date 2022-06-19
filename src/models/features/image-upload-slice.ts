import { ImageUploadResponse } from "models/api"

export interface ImageUploadState {
  imageUploadResponse: undefined | ImageUploadResponse
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}