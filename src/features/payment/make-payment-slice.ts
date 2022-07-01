import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import axios from 'axios'
import { ListBankState } from 'models/features'
import paymentApi from 'api/payment-api'
import { MakePaymentSliceRequest, MakePaymentState } from 'models/features/make-payment-slice'
import { MakePaymentRequest } from 'models/api'

const initialState: MakePaymentState = {
  makePayment: undefined,
  status: 'init',
  failureDescription: '',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const makePaymentAsync = createAsyncThunk(
  'makePayment/makePaymentAsync',
  async (data : MakePaymentSliceRequest, { rejectWithValue }) => {
    try {
      const request: MakePaymentRequest = {
        amount: data.amount,
        orderDescription: 'remark',
        locale: 'en',
        phone: 'phone',
        channel: 'IB',
        bankCode: data.bankCode,
        paymentMethod: data.paymentMethod,
        userId: data.userId,
        invoiceId: data.invoiceId,
        invoiceCode: data.invoiceCode,
        saveCard: 1,
        AgainLink: process.env.REACT_APP_PAYMENT_COMPLETE_REDIRECT_URL || `${window.location.origin.toString()}/confirm/`,
      }
      const response = await paymentApi.makePayment(request)
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

const makePaymentSlice = createSlice({
  name: 'makePayment',
  initialState,
  reducers: {
    resetMakePayment: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(makePaymentAsync.pending, (state: MakePaymentState) => {
        return {
          makePayment: undefined,
          status: 'loading',
          failureDescription: '',
        }
      })
      .addCase(makePaymentAsync.fulfilled, (state: MakePaymentState, action) => {
        return {
          makePayment: action.payload,
          status: 'idle',
          failureDescription: '',
        }
      })
      .addCase(makePaymentAsync.rejected, (state: MakePaymentState, action) => {
        return {
          makePayment: undefined,
          status: 'failed',
          failureDescription: JSON.stringify(action.payload as Object),
        }
      })
  },
})

function handleResetAction(state: MakePaymentState) {
  state.makePayment = undefined
  state.status = 'init'
  state.failureDescription = ''
}

export const { resetMakePayment } = makePaymentSlice.actions

export const selectMakePayment = (state: RootState) =>
  state.makePayment.makePayment
export const selectPaymentStatus = (state: RootState) => state.makePayment.status
export const selectPaymentFailureDescription = (state: RootState) =>
  state.makePayment.failureDescription

export const makePaymentReducer = makePaymentSlice.reducer
