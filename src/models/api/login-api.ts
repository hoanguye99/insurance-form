export interface LoginResponse {
  accessToken: string
  displayName: string
  role: "USER" | "ADMIN"
}

export interface LoginError {
  code: number
  error: string
  description: string
}

export interface LoginRequest {
  userName: string
  password: string
}
