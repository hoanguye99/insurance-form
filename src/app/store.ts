import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { sessionTimeoutTimerReducer } from 'features/auth/session-timeout-timer-slice'
import { userLoginReducer } from 'features/auth/user-login-slice'
import counterReducer from 'features/counter/counterSlice'
import { imageUploadReducer } from 'features/image/image-upload-slice'
import { orderCreateReducer } from 'features/order/order-create-slice'
import { orderGroupCreateReducer } from 'features/order/order-group-create-slice'
import { orderGroupReducer } from 'features/order/order-group-slice'
import { orderListReducer } from 'features/order/order-list-slice'
import { productListReducer } from 'features/product/product-list-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userLogin: userLoginReducer,
    sessionTimeoutTimer: sessionTimeoutTimerReducer,

    productList: productListReducer,

    imageUpload: imageUploadReducer,

    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
    orderGroupCreate: orderGroupCreateReducer,
    orderGroup: orderGroupReducer,
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
