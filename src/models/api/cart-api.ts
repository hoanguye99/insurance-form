export interface CreateCartResponse {
  orderId: string
  userName: string
  orderCode: string
  productType: string
  InsId: string
  amount: number
}

export interface AddCartResponse {
  orderDetailId: string
  orderId: string
  productType: string
  insId: string
  amount: number
}

export interface GetLatestCartDetailResponse {
  details: CartItemResponse[]
  orderId: string
}

export interface CartItemResponse {
  id: string
  createdDate: string
  productType: string
  insId: string
  amount: string
}

export interface ConfirmCartResponse {
  invoiceId: string
  orderId: string
  invoiceCode: string
  amount: string
}
