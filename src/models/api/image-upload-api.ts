
export type ImageUploadResponse = ImageUploadResponseSuccess | ImageUploadResponseFailed

interface ImageUploadResponseSuccess {
  errorCode: 0
  info: {
    name: string
    engine_number: string
    address: string
    chassis_number: string
    make: string
    vehicle_type: string
    vehicle_color: string
    no_seat: string
    birth_year: string
    model: string
    vehicle_capacity: string
    plate_number: string
    registration_date: string
    gross_weight: string
    no_stand: string
    no_lie: string
    doe: string
    plate_color: string
    type: string
  }
  image: string
}

interface ImageUploadResponseFailed {
  errorCode: number
  errorMessage: string
  image: string
}
