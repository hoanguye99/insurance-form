import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import axios from 'axios'
import {CartConfirmState} from 'models/features'
import cartApi from 'api/cart-api'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { validateToken } from 'features/validateToken'
import { getCartAsync } from './cart-get-slice'

const initialState: CartConfirmState = {
  cartConfirmResponse: undefined,
  status: 'init',
  failureDescription: ''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const confirmCartAsync = createAsyncThunk(
  'cartConfirm/confirmCartAsync',
  async (data: string, {dispatch, getState, rejectWithValue }) => {
    try {
      const userDetail = selectUserDetail(getState() as RootState)
      validateToken(userDetail, dispatch)
      const response = await cartApi.confirmCart(userDetail, data)
      // dispatch(getCartAsync())
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw error
        }
        return rejectWithValue(error.response.data)
      } else {
        throw error
      }
    }
  }
)

const cartConfirmSlice = createSlice({
  name: 'cartConfirm',
  initialState,
  reducers: {
    resetCartConfirm: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(confirmCartAsync.pending, (state: CartConfirmState) => {
        return {
          cartConfirmResponse: undefined,
          status: 'loading',
          failureDescription: '',
        }
      })
      .addCase(confirmCartAsync.fulfilled, (state: CartConfirmState, action) => {
        return {
          cartConfirmResponse: action.payload,
          status: 'idle',
          failureDescription: ''
        }
      })
      .addCase(confirmCartAsync.rejected, (state: CartConfirmState, action) => {
        return {
          cartConfirmResponse: undefined,
          status: 'failed',
          failureDescription: JSON.stringify(action.payload as Object),
        }
      })
  },
})

function handleResetAction(state: CartConfirmState) {
  state.cartConfirmResponse = undefined
  state.status = 'init'
  state.failureDescription = ''
}

export const { resetCartConfirm } = cartConfirmSlice.actions

export const selectCartConfirmResponse = (state: RootState) => state.cartConfirm.cartConfirmResponse
export const selectStatus = (state: RootState) => state.cartConfirm.status
export const selectFailureDescription = (state: RootState) =>
  state.cartConfirm.failureDescription

export const cartConfirmReducer = cartConfirmSlice.reducer
