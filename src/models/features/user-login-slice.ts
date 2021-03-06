import { LoginResponse } from 'models/api'

export interface LoginState {
  loggedIn: boolean
  userDetail: UserDetail
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}

export interface UserDetail extends Omit<LoginResponse, 'role'> {
  role: 'USER' | 'ADMIN' | 'ANONYMOUS'
}

// export type UserRole = 'USER' | 'ADMIN' | 'ANONYMOUS'

export interface LoginType {
  username: string
  password: string
}

export interface AccessTokenDecoded {
  displayName: string
  userName: string
  email: string
  role: string
  type: string
  permissions: string
  exp: number
  iat: number
}