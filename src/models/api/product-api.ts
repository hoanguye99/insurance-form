import { UserDetail } from 'models/features'

export type GetAllProductTypeResponse = {
  insTypes: ProductType[]
}

// export type GetAllProductTypeRequest =  UserDetail

export interface ProductType {
  id: number
  code: string
  name: string
  description: string
  totalAmount: string
  image: string
}
