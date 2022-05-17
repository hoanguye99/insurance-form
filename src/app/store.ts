import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { userLoginReducer } from 'features/auth/user-login-slice'
import counterReducer from 'features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userLogin: userLoginReducer,
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
