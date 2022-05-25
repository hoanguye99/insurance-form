export interface CreateOrderFormData {
  typeCode: string
  ownerName: string
  address: string
  plate: string
  startDate: string
  endDate: string
  engineNo: string
  chassisNo: string
}

export type GetAllInsuranceOrdersResponse = {
  ins: InsuranceOrder[]
}

// export type GetAllProductTypeRequest =  UserDetail

export interface CreateOrderError {
  code: number
  error: string
  description: string
}

export interface InsuranceOrder {
  id: string
  typeCode: string
  userName: string
  displayName: string
  ownerName: string
  address: string
  plate: string
  startDate: string
  endDate: string
  engineNo: string
  chassisNo: string
  status: number
}
