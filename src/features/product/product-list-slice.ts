import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import axios from 'axios'
import {ProductListState } from 'models/features'
import productApi from 'api/product-api'
import { selectUserDetail } from 'features/auth/user-login-slice'
import { validateToken } from 'features/validateToken'

const initialState: ProductListState = {
  productList: localStorage.getItem('productList')
    ? JSON.parse(localStorage.getItem('productList')!)
    : {},
  status: 'idle',
  failureDescription: ''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllProductTypesAsync = createAsyncThunk(
  'productList/getAllProductTypes',
  async (data, {dispatch, getState, rejectWithValue }) => {
    try {
      const userDetail = selectUserDetail(getState() as RootState)
      validateToken(userDetail, dispatch)
      const response = await productApi.getAllProductTypes(userDetail)
      localStorage.setItem('productList', JSON.stringify(response))
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

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    resetProductList: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductTypesAsync.pending, (state: ProductListState) => {
        state.status = 'loading'
      })
      .addCase(getAllProductTypesAsync.fulfilled, (state: ProductListState, action) => {
        return {
          productList: action.payload,
          status: 'idle',
          failureDescription: ''
        }
      })
      .addCase(getAllProductTypesAsync.rejected, (state: ProductListState, action) => {
        return {
          productList: {},
          status: 'failed',
          failureDescription: 'GET API getAllProductTypes Failure',
        }
      })
  },
})

function handleResetAction(state: ProductListState) {
  localStorage.removeItem('productList')
  state.productList = {}
  state.status = 'idle'
  state.failureDescription = ''
}

export const { resetProductList } = productListSlice.actions

export const selectProductList = (state: RootState) => state.productList.productList
export const selectStatus = (state: RootState) => state.productList.status
export const selectFailureDescription = (state: RootState) =>
  state.productList.failureDescription

export const productListReducer = productListSlice.reducer
