import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { userLoginReducer } from 'features/auth/user-login-slice'
import counterReducer from 'features/counter/counterSlice'
import { productListReducer } from 'features/product/product-list-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userLogin: userLoginReducer,
    

    productList: productListReducer
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
