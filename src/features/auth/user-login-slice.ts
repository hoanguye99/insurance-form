import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import loginApi from 'api/login-api'
import { RootState } from 'app/store'
import axios from 'axios'
import { LoginError } from 'models/api'
import { LoginState, LoginType } from 'models/features'

const initialState: LoginState = {
  loggedIn: localStorage.getItem('userInfo') ? true : false,
  userDetail: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : { accessToken: '', displayName: 'anonymous', role: 'ANONYMOUS' },
  status: 'idle',
  failureDescription: '',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'userLogin/loginAsync',
  async (data: LoginType, { rejectWithValue }) => {
    const { username, password } = data
    try {
      const response = await loginApi.login({
        userName: username,
        password: password,
      })
      localStorage.setItem('userInfo', JSON.stringify(response))
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error
        }

        return rejectWithValue(error.response.data)
      } else {
        // do something else
        // or creating a new error
        throw new Error('different error than axios')
      }
    }
  }
)

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    logout: handleLogoutAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: LoginState) => {
        state.status = 'loading'
      })
      .addCase(loginAsync.fulfilled, (state: LoginState, action) => {
        return {
          loggedIn: true,
          userDetail: {
            ...action.payload,
          },
          status: 'idle',
          failureDescription: '',
        }
      })
      .addCase(loginAsync.rejected, (state: LoginState, action) => {
        return {
          loggedIn: false,
          status: 'failed',
          userDetail: {
            accessToken: '',
            displayName: 'anonymous',
            role: 'ANONYMOUS',
          },
          failureDescription: (action.payload as LoginError).description,
        }
      })
  },
})

function handleLogoutAction(state: LoginState) {
  localStorage.removeItem('userInfo')
  state.loggedIn = false
  state.userDetail = {
    accessToken: '',
    displayName: 'anonymous',
    role: 'ANONYMOUS',
  }
  state.status = 'idle'
  state.failureDescription = ''
}

export const { logout } = userLoginSlice.actions

export const selectLoggedIn = (state: RootState) => state.userLogin.loggedIn
export const selectUserDetail = (state: RootState) => state.userLogin.userDetail
export const selectStatus = (state: RootState) => state.userLogin.status
export const selectFailureDescription = (state: RootState) =>
  state.userLogin.failureDescription

export const userLoginReducer = userLoginSlice.reducer