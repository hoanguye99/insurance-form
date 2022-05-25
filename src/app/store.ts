import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { userLoginReducer } from 'features/auth/user-login-slice'
import counterReducer from 'features/counter/counterSlice'
import { orderCreateReducer } from 'features/order/order-create-slice'
import { orderListReducer } from 'features/order/order-list-slice'
import { productListReducer } from 'features/product/product-list-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userLogin: userLoginReducer,
    
    productList: productListReducer,


    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
