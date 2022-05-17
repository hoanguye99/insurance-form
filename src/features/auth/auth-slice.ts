import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AuthState, LoginType } from "models/features";

const initialState: AuthState = {
  loggedIn: false,
  user: ''
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: handleLoginAction,
    logout: handleLogoutAction,
  }
})

function handleLoginAction(state : AuthState, action: PayloadAction<LoginType>) {
  const {username, password} = action.payload
  if (username === 'hoang' && password === 'hoang123') {
    return {
      loggedIn: true,
      user: username
    }
  }
  return {...state}
}

function handleLogoutAction(state : AuthState) {
  return initialState
}

export const {login, logout} = authSlice.actions

export const selectLoggedIn = (state: RootState) => state.auth.loggedIn

export const selectUser = (state: RootState) => state.auth.user

export const authReducer = authSlice.reducer