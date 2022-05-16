export interface LoginResponse {
  errorCode: string
  errorMessage: string
}


export interface LoginRequest {
  username: string
  password: string
}
