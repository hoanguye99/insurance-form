import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AuthState, LogInType } from "models/slice";

const initialState: AuthState = {
  loggedIn: false,
  user: ''
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: handleLogInAction,
    logOut: handleLogOutAction,
  }
})

function handleLogInAction(state : AuthState, action: PayloadAction<LogInType>) {
  const {username, password} = action.payload
  if (username === 'hoang' && password === 'hoang123') {
    return {
      loggedIn: true,
      user: username
    }
  }
  return {...state}
}

function handleLogOutAction(state : AuthState) {
  return initialState
}

export const {logIn, logOut} = authSlice.actions

export const selectLoggedIn = (state: RootState) => state.auth.loggedIn

export const selectUser = (state: RootState) => state.auth.user

export const authReducer = authSlice.reducer