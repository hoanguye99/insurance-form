import { GetAllProductTypeResponse, LoginResponse, ProductType } from 'models/api'

export interface ProductListState {
  productList: {} | GetAllProductTypeResponse
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}

// interface UserDetail extends Omit<LoginResponse, 'role'> {
//   role: 'USER' | 'ADMIN' | 'ANONYMOUS'
// }

// export interface LoginType {
//   username: string
//   password: string
// }
