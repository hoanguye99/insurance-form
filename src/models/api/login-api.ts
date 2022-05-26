export interface LoginResponse {
  accessToken: string
  refreshToken: string
  displayName: string
  role: "USER" | "ADMIN"
  email: string
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

export interface RefreshTokenResponse {
  accessToken: string
}
