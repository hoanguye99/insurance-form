import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import axios from 'axios'
import orderApi from 'api/order-api'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { CreateOrderFormData } from 'models/api'
import { OrderGroupCreateState } from 'models/features'

const initialState: OrderGroupCreateState = {
  orderGroupCreateResponse: undefined,
  status: 'idle',
  failureDescription: '',
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createGroupOrderAsync = createAsyncThunk(
  'orderGroupCreate/createGroupOrder',
  async (data: CreateOrderFormData[], { getState, rejectWithValue }) => {
    try {
      const userDetail = selectUserDetail(getState() as RootState)
      data.forEach( order => {
        order.startDate = order.startDate.split('-').join('')
        order.endDate = order.endDate.split('-').join('')
      })
      const response = await orderApi.createGroupInsuranceOrder(data, userDetail)
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

const orderGroupCreateSlice = createSlice({
  name: 'orderGroupCreate',
  initialState,
  reducers: {
    resetOrderGroupCreate: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createGroupOrderAsync.pending, (state: OrderGroupCreateState) => {
        return {
          orderGroupCreateResponse: undefined,
          status: 'loading',
          failureDescription: '',
        }
      })
      .addCase(createGroupOrderAsync.fulfilled, (state: OrderGroupCreateState, action) => {
        return {
          orderGroupCreateResponse: action.payload,
          status: 'idle',
          failureDescription: '',
        }
      })
      .addCase(createGroupOrderAsync.rejected, (state: OrderGroupCreateState, action) => {
        return {
          orderGroupCreateResponse: undefined,
          status: 'failed',
          failureDescription: JSON.stringify(action.payload as Object),
        }
      })
  },
})

function handleResetAction(state: OrderGroupCreateState) {
  state.orderGroupCreateResponse = undefined
  state.status = 'idle'
  state.failureDescription = ''
}

export const { resetOrderGroupCreate } = orderGroupCreateSlice.actions

export const selectOrderGroupCreateResponse = (state: RootState) => state.orderGroupCreate.orderGroupCreateResponse
export const selectStatus = (state: RootState) => state.orderGroupCreate.status
export const selectFailureDescription = (state: RootState) =>
  state.orderGroupCreate.failureDescription

export const orderGroupCreateReducer = orderGroupCreateSlice.reducer
